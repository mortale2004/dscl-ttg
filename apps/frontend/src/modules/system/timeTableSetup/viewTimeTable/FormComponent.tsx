import { apiHooks } from '@dscl-ttg/hooks';
import { SelectField } from '@dscl-ttg/ui/Form';
import GridItem from '@dscl-ttg/ui/GridItem';
import { Button } from '@mui/material';
import React, { Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoPrint } from 'react-icons/io5';

const FormComponent : React.FC<{onPrint: Function} & UseFormReturn> = ({watch, onPrint}) => {

    const academic_year_id = watch("academic_year_id");
    const department_id = watch("department_id");
    const course_id = watch("course_id");
    const course_sem_id = watch("course_sem_id");
  
    const { data: academicYear } = apiHooks?.academicYear?.useGetList({
      is_active: true,
    });
    const { data: department } = apiHooks?.department?.useGetList({
      is_active: true,
    });
    const { data: course } = apiHooks?.course?.useGetList({
      is_active: true,
    });
  
    const { data: courseSem } = apiHooks?.courseSem?.useGetList({
      is_active: true,
    });
  
    const { data: dcyaMapping } = apiHooks?.dcyaMapping?.useGetList(
      {
        is_active: true,
        academic_year_id: academic_year_id,
        department_id: department_id,
        course_id: course_id,
        course_sem_id: course_sem_id,
      },
      {
        enabled:
          !!academic_year_id && !!department_id && !!course_id && !!course_sem_id,
      }
    );


  return (
    <Fragment>
        <GridItem md={4}>
        <SelectField
          label="Academic Year"
          name="academic_year_id"
          options={academicYear?.data}
          optionLabelKey="academic_year_name"
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          label="Department"
          name="department_id"
          options={department?.data}
          optionLabelKey="department_name"
        />
      </GridItem>

      <GridItem md={4}>
        <SelectField
          label="Course"
          name="course_id"
          options={course?.data}
          optionLabelKey="course_name"
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          label="Course Sem"
          name="course_sem_id"
          options={courseSem?.data}
          optionLabelKey="course_sem_name"
        />
      </GridItem>
      <GridItem md={4}>
        <SelectField
          label="Class"
          name="dcya_id"
          options={dcyaMapping?.data}
          optionLabelKey="division_name"
        />
      </GridItem>




    <GridItem md={4} className='space-between' sx={{
      gap: 3
    }}>

      {onPrint &&  

<Button startIcon={<IoPrint/>} onClick={onPrint as any} variant='contained' fullWidth >Print</Button>


}

<Button startIcon={<FaEye/> } type="submit" variant='contained' fullWidth>View</Button>
</GridItem>
    </Fragment>
  )
}

export default FormComponent