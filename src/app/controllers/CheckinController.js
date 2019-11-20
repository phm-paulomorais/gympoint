import * as Yup from 'yup';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const { id, created_at, updated_at } = await Checkin.create({
      student_id
    });

    return res.json({
      id,
      student_id,
      created_at,
      updated_at
    });
  }

  async index(req, res) {
    const ckeckin = await Checkin.findAll({
      where: { student_id: req.params.student_id },
      order: [['created_at', 'desc']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age']
        }
      ]
    });

    return res.json(ckeckin);
  }
}

export default new CheckinController();
