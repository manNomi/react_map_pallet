import MinusIcon from "../../asset/minus_icon";
import PlusIcon from "../../asset/plus_icon";
import CheckBox from "../CheckBox/CheckBox";
import SearchContainer from "../search_container/SearchContainer";
import HoverIcon from "../hover_icon/HoverIcon";
import Style from "./style";
import useCheckAtom from "../../../../../shared/recoil/useCheckAtom";
import useAside from "../../model/useAside";

const Aside = () => {
  const [asideOpen, setAsideOpen] = useAside();
  const [check, setCheck] = useCheckAtom();
  return (
    <>
      <Style.Aside>
        <Style.Button>
          <HoverIcon
            onClick={setAsideOpen}
            resource={asideOpen ? MinusIcon : PlusIcon}
          />
        </Style.Button>
        {asideOpen && (
          <div>
            <CheckBox
              text="노드"
              check={check.node}
              change={() => {
                setCheck("node");
              }}
            />
            <CheckBox
              text="버스"
              check={check.bus}
              change={() => {
                setCheck("bus");
              }}
            />
          </div>
        )}
      </Style.Aside>
      <SearchContainer />
    </>
  );
};
export default Aside;
