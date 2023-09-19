import { React, useContext, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { sql } from "@codemirror/lang-sql";
import { tags as t } from "@lezer/highlight";
import Shape from "./shape";
// import { Parser } from "node-sql-parser";
import { Tabs } from "@douyinfe/semi-ui";
import TableOverview from "./table_overview";
import ReferenceOverview from "./reference_overview";
import { defaultTableTheme } from "../data/data";
import { AreaContext } from "../pages/editor";
// import { TableContext } from "../pages/editor";

const myTheme = createTheme({
  dark: "light",
  settings: {},
  styles: [
    { tag: t.comment, color: "#8ab0ed" },
    { tag: t.string, color: "#e68e29" },
    { tag: t.number, color: "#e68e29" },
    { tag: t.keyword, color: "#295be6" },
    { tag: t.variableName, color: "#1a00db" },
    { tag: t.typeName, color: "#295be6" },
    { tag: t.tagName, color: "#008a02" },
  ],
});

const EditorPanel = (props) => {
  const [tab, setTab] = useState("1");
  // const map = useRef(new Map());
  // const {tables, setTables} = useContext(TableContext);
  const { areas, setAreas } = useContext(AreaContext);

  const tabList = [
    { tab: "Tables", itemKey: "1" },
    { tab: "Relationships", itemKey: "2" },
    { tab: "Shapes", itemKey: "3" },
    { tab: "Editor", itemKey: "4" },
  ];
  const contentList = [
    <TableOverview
      selectedTable={props.selectedTable}
      setSelectedTable={props.setSelectedTable}
    />,
    <ReferenceOverview />,
    <Shape />,
    <CodeMirror
      value={props.code}
      height="100%"
      theme={myTheme}
      extensions={[sql()]}
      onChange={(e) => {
        props.setCode(e);
      }}
    />,
  ];

  return (
    <div className="flex h-full">
      <div style={{ width: `${props.width}px` }} className="overflow-y-auto">
        <Tabs
          type="card"
          tabList={tabList}
          onChange={(key) => {
            setTab(key);
          }}
          collapsible
        >
          <div className="p-2">{contentList[parseInt(tab) - 1]}</div>
        </Tabs>
        <button
          onClick={() => {
            const newArea = {
              id: areas.length,
              name: `area_${areas.length}`,
              x: 0,
              y: 0,
              width: 200,
              height: 200,
              color: defaultTableTheme,
            };
            setAreas((prev) => {
              const updatedTables = [...prev, newArea];
              return updatedTables;
            });
          }}
        >
          add area
        </button>
        <br />
        <button
          onClick={() => {
            const blob = new Blob([props.code], {
              type: "text/plain;charset=utf-8",
            });
            window.saveAs(blob, "src.txt");
          }}
        >
          export src
        </button>
        <br />
        <button
          onClick={() => {
            // try {
            //   const parser = new Parser();
            //   const ast = parser.astify(props.code);
            //   console.log(ast);
            //   ast.forEach((e) => {
            //     e.table.forEach((t) => {
            //       if (map.current.has(t.table)) {
            //         return;
            //       }
            //       map.current.set(t.table, t);
            //       const newTable = {
            //         id: props.tables.length,
            //         name: `table_${props.tables.length}`,
            //         x: 0,
            //         y: 0,
            //         fields: [
            //           {
            //             name: "id",
            //             type: "UUID",
            //             default: "",
            //             check: "",
            //             primary: true,
            //             unique: true,
            //             notNull: true,
            //             increment: true,
            //             comment: "",
            //           },
            //         ],
            //         comment: "",
            //         indices: [],
            //         color: defaultTableTheme,
            //       };
            //       props.setTables((prev) => [...prev, newTable]);
            //     });
            //   });
            // } catch (e) {
            //   alert("parsing error");
            // }
          }}
        >
          parse
        </button>
      </div>
      <div
        className={`flex justify-center items-center p-1 h-auto hover:bg-slate-300 cursor-col-resize ${
          props.resize ? "bg-slate-300" : ""
        }`}
        onMouseDown={() => props.setResize(true)}
      >
        <div className="w-1 border-x border-white h-1/6" />
      </div>
    </div>
  );
};

export default EditorPanel;