import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateButton } from "../../../../components/create_button";
import { ListTable } from "../../../../components/list_table";
import { IAsyncData } from "../../../../core/models";
import { IAppReduxState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import { IPricing } from "../../data/entities";
import { pricingReduxActions } from "../state/state";

export const PricingListPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pricingReduxActions.getList());
  }, [dispatch]);
  const pricingListBranch = useSelector<IAppReduxState, IAsyncData<IPricing[]>>((state) => state.pricing.list);

  const deletePricing = async (id: string): Promise<void> => {
    await dispatch(pricingReduxActions.delete(id));
    dispatch(pricingReduxActions.getList());
  };
  const deleteBranch = useSelector<IAppReduxState, IAsyncData<void>>((state) => state.pricing.delete);

  return (
    <div>
      <CreateButton route={ROUTES.pricing} />

      <ListTable<IPricing>
        branch={pricingListBranch}
        route={ROUTES.pricing}
        onDelete={deletePricing}
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
        renderRow={(pricing) => (
          <>
            <TableCell>{pricing.title.az}</TableCell>
            <TableCell>{pricing.title.en}</TableCell>
            <TableCell>{pricing.title.ru}</TableCell>
            <TableCell>{pricing.description.az}</TableCell>
            <TableCell>{pricing.description.en}</TableCell>
            <TableCell>{pricing.description.ru}</TableCell>
          </>
        )}
      />
    </div>
  );
};
