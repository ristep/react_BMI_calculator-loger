import Axios from "Axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const bmiGetHistoryQuery = (par) => {
  return {
    Listing: {
      type: "bmi_log",
      key: {
        user_id: par,
      },
      attributes: [
        "id",
        "user_id",
        "age",
        "gender",
        "height",
        "weight",
        "bmic",
        "date_time",
      ],
    },
  };
};

const bmiAddHistoryQuery = (prm) => {
  const { user_id, age, gender, weight, height } = prm;
  return {
    Create: {
      type: "bmi_log",
      attributes: {
        user_id,
        age,
        gender,
        weight,
        height,
      },
    },
  };
};

export const useBmiHistory = (props) => {
  const queryClient = useQueryClient()
  const { userID } = props;
  const { isLoading, isError, data, error } = useQuery
    (['bmiGetHistoryQuery',{userID}], () => 
    Axios.post("", bmiGetHistoryQuery(userID)).then( ret => ret.data )
  );

  const invalidate = () =>
    queryClient.invalidateQueries('bmiGetHistoryQuery');
  
  return {  isLoading, isError, data, error, invalidate };
};

export const useAddBmiHistory = () => {
  const queryClient = useQueryClient()
  const { mutate, isLoading, isError, isSuccess } = useMutation(  
      (newBmi) => Axios.post( "", bmiAddHistoryQuery(newBmi) ),
        {
          onSuccess: () =>  queryClient.invalidateQueries('bmiGetHistoryQuery')
        } 
      ); 
  
  return({ mutate, isLoading, isError, isSuccess });
  };  