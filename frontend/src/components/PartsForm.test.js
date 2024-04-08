import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { usePartsContext } from '../hooks/usePartsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import PartsForm from './PartsForm';

jest.mock('../hooks/usePartsContext', () => ({
  usePartsContext: jest.fn(),
}));

jest.mock('../hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(),
}));

describe('PartsForm', () => {
  it('submits the form with correct data', async () => {
    const dispatch = jest.fn();
    usePartsContext.mockReturnValue({ dispatch });
    const user = { token: '123' };
    useAuthContext.mockReturnValue({ user });

    const { getByLabelText, getByText } = render(<PartsForm />);

    const titleInput = getByLabelText('Kas jāpērk?');
    const ammountInput = getByLabelText('Cik daudz:');
    const priceInput = getByLabelText('Cena:');
    const submitButton = getByText('Add Part to list');

    fireEvent.change(titleInput, { target: { value: 'Test Part' } });
    fireEvent.change(ammountInput, { target: { value: 5 } });
    fireEvent.change(priceInput, { target: { value: 100 } });

    fireEvent.click(submitButton);

    const formData = new FormData();
    formData.append('title', 'Test Part');
    formData.append('ammount', 5);
    formData.append('price', 100);
  });
});