import { Fragment, useState } from "react";

import { Box, Stack, Divider, Typography, Chip } from "@mui/joy";
import { Info, SquareArrowOutUpRight } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import PageTitle from "../Components/PageSetup/PageTitle";
import Header from "../Layout/Header/Header";

import ContainerComponent from "../Components/Container/ContainerComponent";
import ButtonGroupComponent from "../Components/ButtonGroupComponent";
import BoxComponent from "../Components/Container/BoxComponent";
import PaginatedTable from "../Components/Table/PaginatedTable";
import ButtonComponent from "../Components/ButtonComponent";

import { user, legends } from '../Data/index';

function Dashboard() {

  const [selectedOption, setSelectedOption] = useState('All areas'); // Initial view

  const pageDetails = {
    title: "Dashboard",
    description: "Track and oversee how your inventory has changed over time.",
  };

  const statistics = [
    {
      count: 144,
      title: "Reorder items",
      link: '',
      label: 'Go to reordered items'
    },

    {
      count: 32,
      title: "Most consumed items",
      link: '',
      label: 'Go to consumed items'
    },

    {
      count: 24,
      title: "items for disposal ",
      link: '',
      label: 'Go to items for disposal'
    },

    {
      count: 18,
      title: "Zero stock since start of year",
      link: '',
      label: 'Go to zero-stock items'
    },

    {
      count: 48,
      title: "Sufficient but not consumed",
      link: '',
      label: 'Go to unconsumed items'
    },

    {
      count: 48,
      title: "Not consumed without ris",
      link: '',
      label: 'Go to unconsumed items'
    },
  ]


  const buttonOptions = ['All areas', 'Medical', 'Janitorial', 'Office'];

  return (
    <Fragment>
      <Header pageDetails={pageDetails} data={user} />
      <Stack gap={2} mt={2}>

        <ContainerComponent>
          <Stack mb={1}>
            <Box >
              <ButtonGroupComponent
                buttonOptions={buttonOptions}
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
              />
            </Box>

            {/* filters */}
          </Stack>

          <Divider />

          <Stack my={2} direction="row" spacing={2}>
            {statistics.map(({ count, title, link, label }, index) => (
              <BoxComponent>
                <Box p={1} key={index}>
                  <Stack sx={{ color: '#1D70BC' }} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography level="h2" fontWeight={500} textColor={'#1D70BC'}>{count}</Typography>
                    <Info size={'16px'} />
                  </Stack>

                  <Typography fontSize={14}>{title}</Typography>

                  <Divider />

                  <Box my={1}>
                    <Link to={link}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <Typography mr={1} fontSize={14} sx={{ color: '#2D7230', }}>
                          {label}
                        </Typography>
                        <SquareArrowOutUpRight color="#2D7230" size={16} />
                      </Stack>
                    </Link>
                  </Box>
                </Box>
              </BoxComponent>
            ))}
          </Stack>

          <Box
            display='flex'
            direction='row'
            justifyContent='space-between'
          >
            <Stack sx={{ color: '#1D70BC' }} direction={'row'} spacing={1} alignItems={'center'}>
              <Info size={'16px'} />
              <Typography fontSize={12}>
                Values displayed are based on monthly averages excluding zero stocks and unused items.
              </Typography>
            </Stack>

            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <Typography fontSize={14}>
                Legends:
              </Typography>

              {
                legends.map(({ title, backgroundColor }, index) => (
                  <Stack key={index} direction={'row'} alignContent={'center'}>
                    <Chip
                      size="sm"
                      sx={{
                        backgroundColor: `${backgroundColor}`,
                        "--Chip-radius": "50px",
                        "--Chip-paddingInline": "10px",
                      }}
                    />
                    <Typography ml={1} fontSize={12}>
                      {title}
                    </Typography>
                  </Stack>
                ))
              }

            </Stack>
          </Box>
        </ContainerComponent >

        <ContainerComponent>
          <PaginatedTable
            tableTitle={"Inventory monitoring"}
            tableDesc={"See how resource supplies were accumulated and consumed in your organization’s inventory."}
            // loading={isLoading}
            // columns={columns}
            // rows={releasedItems}
            actionBtns={
              <Stack direction="row" spacing={1}>
                <ButtonComponent
                  variant={"solid"}
                  label="Generate report"
                  size="lg"
                />
              </Stack>
            }
          />

        </ContainerComponent>

      </Stack >
    </Fragment >
  );
}

export default Dashboard;
