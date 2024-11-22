import React from 'react'

import { Grid } from '@mui/joy'

//custom components
import AutoCompleteComponent from '../../../Components/Form/AutoCompleteComponent'
import InputComponent from '../../../Components/Form/InputComponent'
import DatePickerComponent from '../../../Components/Form/DatePickerComponent'
import TextAreaComponent from '../../../Components/Form/TextAreaComponent'

const Step2Form = ({ areaOptions, isAreasLoading, requestingOffice, setRequestingOffice, qtyRequest, setQtyRequest, risDate, setRisDate, risNo, setRisNo, remarks, setRemarks }) => {
    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <AutoCompleteComponent
                        placeholder="Search area..."
                        label="Requesting Office"
                        options={areaOptions}
                        loading={isAreasLoading}
                        value={areaOptions.find(option => option.id === requestingOffice) || null}
                        onChange={(e, value) => { setRequestingOffice(value?.id || null); }}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputComponent
                        size={'lg'}
                        label="Quantity Requested"
                        placeholder="xxx.xxx.xxx"
                        fullWidth={true}
                        value={qtyRequest}
                        onChange={(e) => { setQtyRequest(e.target.value); }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <DatePickerComponent
                        label="RIS date"
                        placeholder="xxxx.xx.xx"
                        value={risDate}
                        onChange={(date) => setRisDate(date)}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputComponent
                        size={'lg'}
                        label="RIS number"
                        placeholder="xxx.xxx.xxx"
                        fullWidth={true}
                        value={risNo}
                        onChange={(e) => { setRisNo(e.target.value); }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextAreaComponent
                        label={'Remarks'}
                        placeholder={'Enter Remarks'}
                        value={remarks}
                        onChange={(e) => { setRemarks(e.target.value); }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Step2Form