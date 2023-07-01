import TitleIcon from "@mui/icons-material/Title";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

export const addFieldList = [
  {
    title: "TEXT CONTENT",
    icon: <TitleIcon className="mx-2" />,
    type: "label",
  },
  {
    title: "SHORT ANSWER",
    icon: <ShortTextIcon className="mx-2" />,
    type: "text",
  },
  {
    title: "LONG ANSWER",
    icon: <SubjectIcon className="mx-2" />,
    type: "textarea",
  },
  {
    title: "SINGLE CHOICE",
    icon: <RadioButtonCheckedIcon className="mx-2" />,
    type: "radio",
  },
  {
    title: "MULTIPLE CHOICE",
    icon: <CheckBoxIcon className="mx-2" />,
    type: "checkbox",
  },
  {
    title: "DROPDOWN",
    icon: <ArrowDropDownCircleIcon className="mx-2" />,
    type: "dropdown",
  },
];
