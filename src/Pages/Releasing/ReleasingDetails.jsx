import React from 'react';
import useSelectedRow from '../../Store/SelectedRowStore';

const ReleasingDetails = () => {
    const { selectedRow } = useSelectedRow();

    return (
        <div>
            {selectedRow ? (
                <pre>{JSON.stringify(selectedRow, null, 2)}</pre> // Use JSON.stringify to render the object
            ) : (
                <p>No row selected</p> // Handle the case when no row is selected
            )}
        </div>
    );
};

export default ReleasingDetails;
