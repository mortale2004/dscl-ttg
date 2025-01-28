import { apiHooks } from "@dscl-ttg/hooks";
import { MenuItem } from "@mui/material";
import { memo, useCallback } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

export type PapersProps = {
    control: any;
  };
  const Papers: React.FC<PapersProps> = memo(({ control }) => {
    const {  remove, append } = useFieldArray({
      name: "papers",
      control: control,
    });
  
    const paper_type_id = useWatch({
      control: control,
      name: "paper_type_id",
    });
    const course_id = useWatch({
      control: control,
      name: "course_id",
    });
  
    const course_sem_id = useWatch({
      control: control,
      name: "course_sem_id",
    });
  
    const papers = useWatch({
      control: control,
      name: "papers",
    });
  
    const { data: paperType } = apiHooks?.paperType?.useGetList({
      is_active: true,
    });
  
    const { data: paper } = apiHooks?.paper?.useGetList(
      {
        is_active: true,
        course_id: course_id,
        course_sem_id: course_sem_id,
        paper_type_id: paper_type_id,
      },
      {
        enabled: !!paper_type_id && !!course_id && !!course_sem_id,
      }
    );
  
  
    const renderPaperOption = useCallback(
      (options: any[]) => {
        return options.map((option: any) => (
          <MenuItem
            key={option._id}
            value={option._id}
            onClick={(event: any) => {
              event.stopPropagation();
              event.preventDefault();
              append(option);
            }}
          >
            {" "}
            <IconButton sx={{p:0, pr:2,}}><IoAddCircleOutline/> </IconButton> {option.paper_code} {option.paper_name}
          </MenuItem>
        ));
      },
      [append]
    );
  
  
  
    const filteredPapers = useMemo(() => {
      return paper?.data?.filter((paper: any) => {
        return !papers.find((field: any) => field._id === paper._id);
      });
    }, [papers, paper?.data]);
  
    const tableBodyKeys = useMemo(()=>([
      (_:any, index:number)=> index+1,
      "paper_type_name",
      "paper_code",
      "paper_name",
      (_:any, index:number)=> <IconButton color="error" onClick={() => remove(index)}><MdDelete/></IconButton>
    ]),[remove])
    return (
      <Fragment>
        <GridItem md={3}>
          <SelectField
            name="paper_type_id"
            label="Paper Type"
            options={paperType?.data}
            optionLabelKey="paper_type_name"
          />
        </GridItem>
        <GridItem md={9} className="space-between">
          <SelectField
            name="paper_id"
            label="Paper"
            options={filteredPapers}
            renderOptions={renderPaperOption}
          />
        </GridItem>
  
        <GridItem>
          <Table data={papers} tableBodyKeys={tableBodyKeys}  tableHeaders={tableHeaders}/>
        </GridItem>
      </Fragment>
    );
  });


  export default Papers;
  
  const tableHeaders = [
    "#",
    "Paper Type",
    "Paper Code",
    "Paper Name",
    "Action",
  ];
  