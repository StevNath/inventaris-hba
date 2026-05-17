export default function Table({
  columns,
  data,
  renderActions,
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">

        <thead className="bg-gray-200">
          <tr>

            {columns.map((col) => (
              <th
                key={col.accessor}
                className="text-left px-4 py-3"
              >
                {col.header}
              </th>
            ))}

            {renderActions && (
              <th className="text-left px-4 py-3">
                Aksi
              </th>
            )}

          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t"
            >

              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-4 py-3"
                >
                  {row[col.accessor]}
                </td>
              ))}

              {renderActions && (
                <td className="px-4 py-3">
                  {renderActions(row)}
                </td>
              )}

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}