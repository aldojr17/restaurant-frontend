import { IMenuPayload } from "../../redux/menu/types";
import Card from "../Card/Card";

interface MenuListProps {
  data: IMenuPayload[];
}

const MenuList = ({ ...props }: MenuListProps) => {
  return (
    <>
      <div className="container mx-auto row mt-5">
        <div className="d-flex mx-auto gap-4 gap-lg-0 flex-wrap justify-content-center justify-content-lg-start">
          {props.data.map((menu) => (
            <Card key={menu.id} {...menu} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuList;
