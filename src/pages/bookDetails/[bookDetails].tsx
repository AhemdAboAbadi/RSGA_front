// ** React Imports
import { SyntheticEvent, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Demo Tabs Imports
import TabAccount from '@views/account-settings/AccountTab'

import axios from 'axios'

import { API_BASE_URL } from '@utils/constant'
import { IUserBooksInterfaceProps } from '@utils/interfaces'
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100,
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67,
  },
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const BookDetail = ({ bookDetails }: IUserBooksInterfaceProps) => {
  const [value, setValue] = useState<string>('account')

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="account"
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
        </TabList>
        {bookDetails && (
          <TabPanel sx={{ p: 0 }} value="account">
            <TabAccount isDisable={false} {...{ ...bookDetails }} isBookDetails />
          </TabPanel>
        )}
      </TabContext>
    </Card>
  )
}

export default BookDetail

export const getServerSideProps = async (context: any) => {
  try {
    const bookDetails = context.query.bookDetails
    const response = await axios.get(`${API_BASE_URL}/books/${bookDetails}`)
    return {
      props: {
        bookDetails: response.data,
      },
    }
  } catch (error) {
    return { notFound: true }
  }
}
