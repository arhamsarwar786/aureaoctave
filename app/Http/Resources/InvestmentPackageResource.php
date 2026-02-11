<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvestmentPackageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'expense_ratio' => $this->expense_ratio,
            'sec_yield' => $this->sec_yield,
            'ytd' => $this->ytd,
            'one_year' => $this->one_year,
            'fund_price' => $this->fund_price,
            'created_at' => $this->created_at->format('d-M-Y'),
            'updated_at' => $this->updated_at->format('d-M-Y'),
        ];
    }
}