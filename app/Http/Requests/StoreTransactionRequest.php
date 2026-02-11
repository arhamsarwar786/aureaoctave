<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'transaction_type' => 'required|in:credit,debit',
            'amount' => 'required|numeric|min:0',
            'pasted_transaction_id' => 'nullable|string|unique:transactions,pasted_transaction_id,' . $this->route('transaction'),
        ];
    }

    public function messages()
    {
        return [
            'pasted_transaction_id.unique' => 'The transaction id is incorrect or already used.',
        ];
    }
}