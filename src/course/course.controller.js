import Course from '../course/course.model.js';

export const defaultCourse = async () => {
  try {
    const courses = [
      { name: 'Taller', description: 'Curso de formación práctica en taller' },
      { name: 'Tecnología', description: 'Curso técnico de fundamentos tecnológicos' },
      { name: 'Práctica Supervisada', description: 'Curso práctico con supervisión profesional' }
    ];

    for (const course of courses) {
      const exists = await Course.findOne({ name: course.name });
      if (!exists) {
        await Course.create(course);
        console.log(`Curso creado: ${course.name}`);
      } else {
        console.log(`Curso ya existe: ${course.name}`);
      }
    }
  } catch (error) {
    console.error('Error al crear los cursos por defecto:', error.message);
  }
};

export default defaultCourse;
