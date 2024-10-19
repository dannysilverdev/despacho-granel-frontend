import React from 'react';
import { FormControl, FormLabel, RadioGroup, Paper, Typography } from '@mui/material';

interface Option {
    value: string;
    label: string;
}

interface CardSelectorProps {
    options: Option[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

const CardSelector: React.FC<CardSelectorProps> = ({ options, value, onChange, label }) => {
    return (
        <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                row
                value={value}
                onChange={onChange}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}
            >
                {options.map((option) => (
                    <Paper
                        key={option.value}
                        elevation={value === option.value ? 8 : 2}
                        sx={{
                            p: 2,
                            minWidth: 120,
                            flex: '1 1 auto',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: value === option.value ? 'primary.light' : 'background.paper',
                            color: value === option.value ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'primary.contrastText',
                            },
                            transition: 'all 0.3s',
                        }}
                        onClick={() => onChange({ target: { value: option.value } } as React.ChangeEvent<HTMLInputElement>)}
                    >
                        <Typography variant="body1">{option.label}</Typography>
                    </Paper>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default CardSelector;