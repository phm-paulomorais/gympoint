// import Student from '../models/Student';
import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Mail from '../../lib/Mail';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      order: [['created_at', 'desc']]
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
      answer_at: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { help_order_id } = req.params;

    const helpOrderExists = await HelpOrder.findByPk(help_order_id);

    if (!helpOrderExists) {
      return res.status(400).json({ error: 'Help order does not exist' });
    }

    const {
      id,
      student_id,
      question,
      answer,
      answer_at
    } = await helpOrderExists.update(req.body);

    const { name, email } = await Student.findOne({
      where: { id: student_id }
    });

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Resposta GymPoint',
      template: 'answer',
      context: {
        student: name,
        question,
        answer
      }
    });

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at
    });
  }
}

export default new HelpOrderController();
