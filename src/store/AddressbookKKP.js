import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailNotulensi,
  getDetailTodo,
  getDivision,
  getDivisionTree,
  getEmployee,
  getEvent,
  getEventAgenda,
  getEventAgendaDetail,
  getEventDetail,
  getEventProgress,
  getEventToday,
  getlistAbsen,
  getlistApprover,
  getlistKalender,
  getlistNotulensi,
  getlistTodo,
  postKomenTodo,
  putAbsen,
} from "../services/Addressbook";

const AddressbookKKPSlice = createSlice({
  name: "AddressbookKKP",
  initialState: {
    addressbook: {
      listsDivision: [],
      listsDivisiontree: [],
      listsDivisionPara: [],
      listsFavorit: [],
      selected: [],
      employee: [],
      id: null,
    },
  },
  reducers: {
    setAddressbookListsDivision: (state, action) => {
      state.addressbook.listsDivision = action.payload;
    },
    setAddressbookListsDivisionTree: (state, action) => {
      state.addressbook.listsDivisiontree = action.payload;
    },
    setAddressbookListsDivisionPara: (state, action) => {
      state.addressbook.listsDivisionPara = action.payload;
    },
    setAddressbookFavorit: (state, action) => {
      state.addressbook.listsFavorit = action.payload;
    },
    setAddressbookEmployee: (state, action) => {
      state.addressbook.employee = action.payload;
    },
    setAddressbookSelected: (state, action) => {
      state.addressbook.selected = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDivision.fulfilled, (state, action) => {
        let kategori = [];
        const data = action.payload;
        data.map((item, index) => {
          kategori.push({
            key: item.id,
            value: item.name,
          });
          if (index == 0) {
            state.addressbook.id = item.id;
          }
        });
        state.addressbook.listsDivision = kategori;
      })
      .addCase(getDivisionTree.fulfilled, (state, action) => {
        let datas = action.payload;
        function renameChildrenToDescendants(datas) {
          datas.forEach((member) => {
            if (member.nodes) {
              member.children = member.nodes;
              delete member.nodes;
              renameChildrenToDescendants(member.children);
            }
          });
        }

        renameChildrenToDescendants(datas);

        state.addressbook.listsDivisiontree = datas;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.addressbook.employee = action.payload;
      });
  },
});

export const {
  setAddressbookListsDivision,
  setAddressbookListsDivisionTree,
  setAddressbookListsDivisionPara,
  setAddressbookFavorit,
  setAddressbookEmployee,
  setAddressbookSelected,
} = AddressbookKKPSlice.actions;

export default AddressbookKKPSlice.reducer;
