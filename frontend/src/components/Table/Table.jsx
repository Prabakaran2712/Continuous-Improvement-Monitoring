import { Tooltip } from "@mui/material";
import Styles from "./Table.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const Table = (props) => {
  if (props.type == "sort") {
    return (
      <table
        className={`${Styles.styledTable}`}
        style={{
          cursor: "pointer",
        }}
      >
        <thead className="">
          <tr>
            {props.thead.map((head, indx) => {
              return (
                <th
                  key={Math.random()}
                  onClick={() => {
                    props.sort(indx);
                  }}
                >
                  <div className={Styles.header}>
                    <div>{head}</div>
                    <div>
                      {indx == 0 || indx == props.thead.length - 1 ? (
                        ""
                      ) : (
                        <FontAwesomeIcon icon={faSort} />
                      )}
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.tbody &&
            props.tbody.map((exam, indx) => {
              var rowsize = exam.length;
              if (props.tooltip != false) {
                return (
                  <Tooltip
                    title="Click to find more details"
                    arrow
                    key={Math.random()}
                  >
                    <tr onClick={props.tbody[indx][exam.length - 1]}>
                      <td>{indx + 1}</td>
                      {exam.map((data, indx) => {
                        if (indx !== exam.length - 1)
                          return <td key={Math.random()}>{data}</td>;
                      })}
                    </tr>
                  </Tooltip>
                );
              } else {
                return (
                  <tr key={Math.random()}>
                    <td>{indx + 1}</td>
                    {exam.map((data, indx) => {
                      if (indx !== exam.length - 1)
                        return <td key={Math.random()}>{data}</td>;
                    })}
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    );
  } else {
    return (
      <table
        className={`${Styles.styledTable}`}
        style={{
          cursor: "pointer",
        }}
      >
        <thead className="">
          <tr>
            {props.thead.map((head, indx) => {
              return (
                <th
                  key={Math.random()}
                  onClick={() => {
                    props.sort(indx);
                  }}
                >
                  <div className={Styles.header}>
                    <div>{head}</div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.tbody.map((exam, indx) => {
            var rowsize = exam.length;
            if (props.tooltip != false) {
              return (
                <Tooltip
                  title="Click to find more details"
                  arrow
                  key={Math.random()}
                >
                  <tr onClick={props.tbody[indx][exam.length - 1]}>
                    <td>{indx + 1}</td>
                    {exam.map((data, indx) => {
                      if (indx !== exam.length - 1)
                        return <td key={Math.random()}>{data}</td>;
                    })}
                  </tr>
                </Tooltip>
              );
            } else {
              return (
                <tr key={Math.random()}>
                  <td>{indx + 1}</td>
                  {exam.map((data, indx) => {
                    if (indx !== exam.length - 1)
                      return <td key={Math.random()}>{data}</td>;
                  })}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    );
  }
};

export default Table;
