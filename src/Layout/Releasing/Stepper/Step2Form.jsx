import React from 'react'

import { Grid } from '@mui/joy'

//custom components
import AutoCompleteComponent from '../../../Components/Form/AutoCompleteComponent'
import InputComponent from '../../../Components/Form/InputComponent'
import DatePickerComponent from '../../../Components/Form/DatePickerComponent'
import TextAreaComponent from '../../../Components/Form/TextAreaComponent'

const Step2Form = ({ formik, areaOptions, isAreasLoading }) => {
    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <AutoCompleteComponent
                        name={'area'}
                        placeholder="Search area..."
                        label="Requesting Office"
                        options={areaOptions}
                        loading={isAreasLoading}
                        value={areaOptions.find(option => option.id === formik.values.area) || null}
                        onChange={(event, value) => formik.setFieldValue("area", value ? value.id : '')}
                        error={formik.touched.area && Boolean(formik.errors.area)}
                        helperText={formik.touched.area && formik.errors.area}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputComponent
                        size={'lg'}
                        label="Quantity Requested"
                        placeholder="xxx.xxx.xxx"
                        fullWidth={true}
                        name={'quantityRequested'}
                        value={formik.values.quantityRequested}
                        onChange={formik.handleChange}
                        error={formik.touched.quantityRequested && Boolean(formik.errors.quantityRequested)}
                        helperText={formik.touched.quantityRequested && formik.errors.quantityRequested}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <DatePickerComponent
                        name={"risDate"}
                        label="RIS date"
                        placeholder="xxxx.xx.xx"
                        value={formik.values.risDate}
                        onChange={(date) => formik.setFieldValue("risDate", date)}
                        error={formik.touched.risDate && Boolean(formik.errors.risDate)}
                        helperText={formik.touched.risDate && formik.errors.risDate}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputComponent
                        size={'lg'}
                        label="RIS number"
                        placeholder="xxx.xxx.xxx"
                        fullWidth={true}
                        name={'risNumber'}
                        value={formik.values.risNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.risNumber && Boolean(formik.errors.risNumber)}
                        helperText={formik.touched.risNumber && formik.errors.risNumber}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextAreaComponent
                        label={'Remarks'}
                        placeholder={'Enter Remarks'}
                        name={'remarks'}
                        value={formik.values.remarks}
                        onChange={formik.handleChange}
                        error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                        helperText={formik.touched.remarks && formik.errors.remarks}
                    />
                </Grid>
            </Grid>



        </div>
    )
}

export default Step2Form