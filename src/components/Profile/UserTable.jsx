import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const results = !searchTerm
    ? users
    : users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  const { items, requestSort, sortConfig } = useSortableData(results);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="w-75 m-auto">
      <table class="table table-hover">
        
        <thead>
          <tr>
            <th scope="col">
            <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Name
              </button>
            </th>
            <th scope="col">
              <button
                type="button"
                onClick={() => requestSort("email")}
                className={getClassNamesFor("email")}
              >
                Email
              </button>
            </th>
            <th scope="col">
              {" "}
              <button
                type="button"
                onClick={() => requestSort("website")}
                className={getClassNamesFor("website")}
              >
                Website
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>
                <Link
                  className="text-dark text-decoration-none"
                  to={`/profile/${item.id}`}
                >
                  {item.name}
                </Link>
              </td>
              <td>{item.email}</td>
              <td>{item.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
