import React from 'react'

import AutoCompleteComponent from '../../Components/Form/AutoCompleteComponent'

const Donation = () => {
    return (
        <div>
            {/* <AutoCompleteComponent
                name={'itemName'}
                placeholder="Search Item..."
                label="Item Name"
                options={suppliesOptions}
                loading={isSuppliesLoading}
                value={suppliesOptions.find(option => option.id === formik.values.itemName) || null}
                onChange={(event, value) => formik.setFieldValue("itemName", value ? value.id : '')}
                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                helperText={formik.touched.itemName && formik.errors.itemName}
                fullWidth={true}
            /> */}
        </div>
    )
}

export default Donation