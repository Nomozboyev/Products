import { Button, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { ProductsHeader } from "../../../components/products.header";
import { ProductsFooter } from "../../../components/product.footer/products.footer";
import { useDispatch, useSelector } from "react-redux";
 import { DelBtn } from "../../../components/button group/del";
import { Update } from "../../../components/button group/update";
import { productActions } from "../../../config/productStore/productStor";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const Product = () => {
  const { products, spin, selectedRowKeys, control } = useSelector(
    ({ productRedusers }) => productRedusers
  );
   const dispach = useDispatch();
  
  useEffect(() => {
    dispach(productActions.spinFincsion(true));
    fetch("https://64a6fca7096b3f0fcc80ef97.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => {

        dispach(productActions.reRenderData());
        dispach(productActions.productData(data));
        dispach(productActions.spinFincsion(false));
      })
      .catch((err) => {
        console.log(err);
        dispach(productActions.spinFincsion(false));
      });
  }, [control]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => {
      return (
        <>
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        </>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          fontSize: "17px",
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Артикул",
      dataIndex: "code",
    },
    {
      title: "Бренд",
      dataIndex: "madeIn",
    },
    {
      title: "Цена",
      dataIndex: "price",
    },
    {
      title: "Цена co скидкой",
      dataIndex: "priceInSale",
    },
    {
      title: "Action",
      key: "action",
      render: (record, a) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Update props={record} />
          <DelBtn props={record} />
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    // bu yerda newSelectedRowKeys ==key ga yani id ga tenglash kerak
 
    dispach(productActions.setSelectedRowKeys(newSelectedRowKeys));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          dispach(productActions.setSelectedRowKeys(newSelectedRowKeys));
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          dispach(productActions.setSelectedRowKeys(newSelectedRowKeys));
        },
      },
    ],
  };
  const tableProps = {
    pagination: {
      defaultPageSize: [5],
    },
    loading: {
      spinning: spin,
      size: "large",
    },
    footer: () => <ProductsFooter />,
    title: () => <ProductsHeader props={searchText} />,
  };
  return (
    <Table
      sx={{
        with: "100%",
        height: "100%",
      }}
      {...tableProps}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={products}
    />
  );
};
