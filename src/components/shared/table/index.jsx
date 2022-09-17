import { v4 as uuidv4 } from 'uuid';

const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={uuidv4()}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={uuidv4()}>
            {columns.map(column => (
              <td key={uuidv4()}>{item[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
