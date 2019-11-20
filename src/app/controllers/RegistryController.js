import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Registry from '../models/Registry';
import Mail from '../../lib/Mail';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistryController {
  async index(req, res) {
    const registries = await Registry.findAll({
      order: ['id'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price']
        }
      ]
    });

    return res.json(registries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
      price: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const registry = await Registry.findOne({
      where: { student_id: req.body.student_id }
    });

    if (registry) {
      return res.status(400).json({ error: 'Registry already exists' });
    }

    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    } = await Registry.create(req.body);

    const { name, email } = await Student.findOne({
      where: { id: student_id }
    });

    const plan_result = await Plan.findOne({
      where: { id: plan_id }
    });

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matrícula GymPoint',
      template: 'registration',
      context: {
        student: name,
        plan: plan_result.title,
        date_initial: format(start_date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt
        }),
        date_final: format(end_date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt
        }),
        value: `${plan_result.price}/mês`
      }
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const registry = await Registry.findByPk(id);

    if (!registry) {
      return res.status(400).json({ error: 'Registry does not exist' });
    }

    const auxStudentId = req.body.student_id;

    const auxPlanId = req.body.plan_id;

    if (auxStudentId && auxStudentId !== registry.student_id) {
      const studentExists = await Student.findOne({
        where: { id: auxStudentId }
      });
      if (!studentExists) {
        return res.status(400).json({ error: 'Student does not exist' });
      }
    }

    if (auxPlanId && auxPlanId !== registry.plan_id) {
      const planExists = await Plan.findOne({
        where: { id: auxPlanId }
      });
      if (!planExists) {
        return res.status(400).json({ error: 'Plan does not exist' });
      }
    }

    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    } = await registry.update(req.body);

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });
  }

  async delete(req, res) {
    const registry = await Registry.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration']
        }
      ]
    });

    if (!registry) {
      return res.status(400).json({ error: 'Registry not found' });
    }

    const {
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      student,
      plan
    } = registry;

    await registry.destroy();

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
      student,
      plan
    });
  }
}

export default new RegistryController();
