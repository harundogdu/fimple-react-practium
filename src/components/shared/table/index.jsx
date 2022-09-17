const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column,index) => (
            <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={index}>{item[column.accessor]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
