import { useState } from "react";
import { useQuery } from "@apollo/client";

import { LIST_CONTINENTS } from "./api/continentQuery";

import ListItem from "./components/ListItem";
import { getGenerateData } from "./utils/fakeData";

function App() {
  const [list, setList] = useState({});
  const [fakeData, setFakeData] = useState({ data: [] });
  const [fakeDataValues, setFakeDataValues] = useState(null);

  useQuery(LIST_CONTINENTS, {
    onCompleted: handleOnCompliteGetData,
  });

  const getNormalizedData = (data) => {
    const normalizedData = data.continents.map((continent) => {
      const countries = continent.countries.map((country) => {
        const languages = country.languages.map((language) => ({
          name: language.name,
        }));
        return { name: country.name, children: languages };
      });
      return { name: continent.name, children: countries };
    });
    return normalizedData;
  };

  function handleOnCompliteGetData(data) {
    const normalizedData = getNormalizedData(data);
    setList({
      data: [...normalizedData],
    });
  }

  const generateData = (e) => {
    e.preventDefault();
    const n = Number(e.target.n.value);
    const m = Number(e.target.m.value);
    setFakeDataValues([m, n]);

    const generateData = getGenerateData(m);
    const data = { data: [...generateData] };
    setFakeData(data);
  };
  return (
    <>
      <h2>Countries API</h2>
      <ul>
        {list?.data?.map((el) => (
          <ListItem item={el} key={el.name} level={1} />
        ))}
      </ul>
      <form onSubmit={generateData} autoComplete="off">
        <h2>Random data</h2>
        <div>
          <label>
            <input name="n" />
            depth of JSON tree
          </label>
        </div>
        <div>
          <label>
            <input name="m" />
            number of children in each node
          </label>
        </div>
        <button type="submit">Generate</button>
      </form>
      {fakeData.data.length > 0 && (
        <ul>
          {fakeData?.data?.map((el) => (
            <ListItem
              item={el}
              key={el.name}
              level={1}
              fakeDataValues={fakeDataValues}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
