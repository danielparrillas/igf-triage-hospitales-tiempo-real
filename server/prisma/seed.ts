import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const pacientes = [
  {
    id: 1,
    nombre: 'Carlos Martínez',
    dui: '02598763-1',
    fechaNacimiento: new Date('1985-06-15'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 2,
    nombre: 'Ana López',
    dui: '04628974-5',
    fechaNacimiento: new Date('1990-03-22'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 3,
    nombre: 'Luis Ramírez',
    dui: '07135682-3',
    fechaNacimiento: new Date('1978-11-10'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 4,
    nombre: 'María Gómez',
    dui: '05897631-8',
    fechaNacimiento: new Date('1995-08-05'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 5,
    nombre: 'José Fernández',
    dui: '02981746-2',
    fechaNacimiento: new Date('1982-01-30'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 6,
    nombre: 'Carmen Vázquez',
    dui: '06321987-4',
    fechaNacimiento: new Date('1987-05-14'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 7,
    nombre: 'Diego Rivera',
    dui: '04126579-9',
    fechaNacimiento: new Date('1993-09-18'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 8,
    nombre: 'Paola Castillo',
    dui: '05643821-0',
    fechaNacimiento: new Date('2000-12-25'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 9,
    nombre: 'Fernando Cruz',
    dui: '03874652-6',
    fechaNacimiento: new Date('1975-04-17'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 10,
    nombre: 'Gloria Méndez',
    dui: '07213489-7',
    fechaNacimiento: new Date('1997-07-11'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 11,
    nombre: 'Roberto Hernández',
    dui: '06498321-2',
    fechaNacimiento: new Date('1983-02-08'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 12,
    nombre: 'Verónica Peña',
    dui: '04712839-4',
    fechaNacimiento: new Date('1992-10-29'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 13,
    nombre: 'Andrés Díaz',
    dui: '03298571-3',
    fechaNacimiento: new Date('1988-03-03'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 14,
    nombre: 'Isabel Pineda',
    dui: '05127468-1',
    fechaNacimiento: new Date('1994-06-20'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 15,
    nombre: 'Francisco Alvarado',
    dui: '02987165-9',
    fechaNacimiento: new Date('1979-01-15'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 16,
    nombre: 'Patricia Morales',
    dui: '06651234-7',
    fechaNacimiento: new Date('1986-09-09'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 17,
    nombre: 'Javier Torres',
    dui: '03784659-3',
    fechaNacimiento: new Date('1991-11-14'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 18,
    nombre: 'Lorena Flores',
    dui: '05437628-5',
    fechaNacimiento: new Date('1998-05-28'),
    sexo: 1,
    ingresos: []
  },
  {
    id: 19,
    nombre: 'Manuel Vega',
    dui: '04897531-6',
    fechaNacimiento: new Date('1981-08-12'),
    sexo: 0,
    ingresos: []
  },
  {
    id: 20,
    nombre: 'Sofía Delgado',
    dui: '06219483-0',
    fechaNacimiento: new Date('1993-12-02'),
    sexo: 1,
    ingresos: []
  }
]

async function main() {
  pacientes.forEach(async (paciente) => {
    await prisma.paciente.upsert({
      where: {
        id: paciente.id
      },
      update: {
        dui: paciente.dui,
        fechaNacimiento: paciente.fechaNacimiento,
        nombre: paciente.nombre,
        sexo: paciente.sexo
      },
      create: {
        dui: paciente.dui,
        fechaNacimiento: paciente.fechaNacimiento,
        nombre: paciente.nombre,
        sexo: paciente.sexo
      }
    })
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
