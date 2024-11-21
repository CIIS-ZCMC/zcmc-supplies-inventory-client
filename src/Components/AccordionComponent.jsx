import React from 'react'

import { Sheet, AccordionGroup, Accordion, AccordionSummary, AccordionDetails } from '@mui/joy'

const AccordionComponent = ({ accordionData }) => {
    return (
        <div>

            <AccordionGroup sx={{ borderRadius: '5px' }} variant='outlined' size='lg'>
                {accordionData.map(({ summary, details }, index) => (
                    <Accordion key={index} defaultExpanded={index === 0} >
                        <AccordionSummary>{summary}</AccordionSummary>
                        <AccordionDetails>
                            {details}
                        </AccordionDetails>
                    </Accordion>
                ))}

            </AccordionGroup>


        </div>
    )
}

export default AccordionComponent