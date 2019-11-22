import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      answer: Yup.string(),
      answer_at: Yup.date()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const auxStudentId = req.params.student_id;

    const studentExists = await Student.findByPk(auxStudentId);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    req.body.student_id = auxStudentId;

    const {
      id,
      student_id,
      question,
      answer,
      answer_at
    } = await HelpOrder.create(req.body);

    return res.json({
      id,
      student_id,
      question,
      answer,
      answer_at
    });
  }

  async index(req, res) {
    const { student_id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id },
      order: [['created_at', 'desc']]
    });

    return res.json(helpOrders);
  }
}

export default new StudentHelpOrderController();
