import Sequelize, { Model } from 'sequelize';
import { addMonths } from 'date-fns';
import Plan from './Plan';

class Registry extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DOUBLE
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async registry => {
      const plan = await Plan.findOne({
        where: { id: registry.plan_id }
      });
      if (plan) {
        if (registry.start_date) {
          registry.end_date = await addMonths(
            registry.start_date,
            plan.duration
          );
        }

        registry.price = plan.price * plan.duration;
      }
    });

    this.addHook('beforeUpdate', async registry => {
      if (registry.plan_id) {
        const plan = await Plan.findOne({
          where: { id: registry.plan_id }
        });
        if (plan) {
          if (registry.start_date) {
            registry.end_date = await addMonths(
              registry.start_date,
              plan.duration
            );
          }

          registry.price = plan.price * plan.duration;
        }
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registry;
