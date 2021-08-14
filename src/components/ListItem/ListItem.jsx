import { useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { getGenerateData } from "../../utils/fakeData";

function ListItem({ item, level, fakeDataValues = null }) {
  const { activeNode, setActiveNode } = useContext(ItemsContext);

  const activeElementWithThisLevel = activeNode?.find(
    (el) => el.level === level
  );

  const isDisplayChildren =
    item.children?.length > 0 && activeElementWithThisLevel?.name === item.name;

  const handleOnElementClick = (name) => {
    // Generated data
    if (
      fakeDataValues !== null &&
      level < fakeDataValues[1] &&
      item.children?.length === 0
    ) {
      const generateData = getGenerateData(fakeDataValues[0]);
      item.children.push(...generateData);
    }

    const isLastElement = !item.children?.length;

    if (activeElementWithThisLevel?.name === name && !isLastElement) {
      setActiveNode((prevState) => {
        const newState = [];
        prevState.forEach((el) => {
          if (el.level < level) {
            newState.push(el);
          }
        });
        return newState;
      });
    }
    if (activeElementWithThisLevel?.name !== name) {
      setActiveNode((prevState) => {
        if (isLastElement) {
          return [];
        } else if (prevState.length && activeElementWithThisLevel) {
          const newState = prevState.map((el) => {
            if (el.level === level) {
              el.name = name;
            }
            return el;
          });

          return newState;
        } else if (!activeElementWithThisLevel) {
          return [...prevState, { level, name }];
        } else {
          return [{ level, name }];
        }
      });
    }
  };
  return (
    <>
      <li key={item.name}>
        <button type="button" onClick={() => handleOnElementClick(item.name)}>
          {item.name}
        </button>

        {isDisplayChildren && (
          <ul>
            {item.children.map((children) => {
              return (
                <ListItem
                  key={children.name}
                  item={children}
                  level={level + 1}
                  fakeDataValues={fakeDataValues}
                />
              );
            })}
          </ul>
        )}
      </li>
    </>
  );
}
export default ListItem;
