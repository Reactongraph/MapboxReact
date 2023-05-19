import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { newProperty } from '../../mock_data/property_data'
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar(props) {
    const { onRentChange, onPriceChange, onCityChange, onStateChange, setSearchQuery, searchQuery } = props
    const [age, setAge] = React.useState('');

    const [rent, setRent] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const handleRentChange = (event) => {
        const selectedValue = event.target.value
        setRent(event.target.value);
        onRentChange(selectedValue);
    };

    const handlePriceChange = (event) => {
        const selectedValue = event.target.value
        setPrice(event.target.value);
        onPriceChange(selectedValue)
    };

    const handleCityChange = (event) => {
        const selectedValue = event.target.value
        setCity(event.target.value);
        onCityChange(selectedValue);
    };

    const handleStateChange = (event) => {
        const selectedValue = event.target.value
        setState(event.target.value);
        onStateChange(selectedValue)
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    // Extract unique values for rent, price, city, and state
    const uniqueRentValues = [...new Set(newProperty.map(property => property.status))];
    const uniquePriceValues = [...new Set(newProperty.map(property => property.price))];
    const uniqueCityValues = [...new Set(newProperty.map(property => property.city))];
    const uniqueStateValues = [...new Set(newProperty.map(property => property.state))];


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="inherit" position="fixed">
                <Toolbar style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            sx={{
                                width: '350px',
                                height: '55px',
                                borderWidth: '1px',
                                border: '1px solid #b3a0a0', borderRadius: '5px',
                                padding: '8px 12px',
                                '&:focus': {
                                    borderColor: '#80bdff',
                                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                                },
                            }}
                        />
                    </Search>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>

                        <FormControl sx={{ width: 180, marginRight: '5px' }}>
                            <InputLabel id="rent-label">Rent</InputLabel>
                            <Select
                                labelId="rent-label"
                                id="rent-select"
                                value={rent}
                                label="Rent"
                                onChange={handleRentChange}
                            >
                                {uniqueRentValues.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 180, marginRight: '5px' }}>
                            <InputLabel id="price-label">Price</InputLabel>
                            <Select
                                labelId="price-label"
                                id="price-select"
                                value={price}
                                label="Price"
                                onChange={handlePriceChange}
                            >
                                {uniquePriceValues.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {`$ ${value}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 180, marginRight: '5px' }}>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                                labelId="city-label"
                                id="city-select"
                                value={city}
                                label="City"
                                onChange={handleCityChange}
                            >
                                {uniqueCityValues.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 180, marginRight: '5px' }}>
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state-select"
                                value={state}
                                label="State"
                                onChange={handleStateChange}
                            >
                                {uniqueStateValues.map((value) => (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
