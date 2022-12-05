import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { ISlider } from "../../data/entities";
import { sliderReduxActions } from "../state/state";

export const SliderListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sliderReduxActions.getList());
  }, [dispatch]);
  const sliderListBranch = useSelector<IAppReduxState, IAsyncData<ISlider[]>>((state) => state.slider.list);

  const deleteSlider = async (id: string): Promise<void> => {
    await dispatch(sliderReduxActions.delete(id));
    dispatch(sliderReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.slider.delete);

  return (
    <div>
      <CreateButton route={ROUTES.slider} />

      <ListTable<ISlider>
        branch={sliderListBranch}
        route={ROUTES.slider}
        onDelete={deleteSlider}
        deleteBranch={deleteBranch}
        renderHeader={() => (
          <>
            <TableCell>Title az</TableCell>
            <TableCell>Title en</TableCell>
            <TableCell>Title ru</TableCell>
            <TableCell>Description az</TableCell>
            <TableCell>Description en</TableCell>
            <TableCell>Description ru</TableCell>
          </>
        )}
        renderRow={(slider) => (
          <>
            <TableCell>{slider.title.az}</TableCell>
            <TableCell>{slider.title.en}</TableCell>
            <TableCell>{slider.title.ru}</TableCell>
            <TableCell>{slider.description.az}</TableCell>
            <TableCell>{slider.description.en}</TableCell>
            <TableCell>{slider.description.ru}</TableCell>
          </>
        )}
      />
    </div>
  );
};
