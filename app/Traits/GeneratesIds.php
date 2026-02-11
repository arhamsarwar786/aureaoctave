<?php

namespace App\Traits;

trait GeneratesIds
{
    private static function generateId($typePrefix, $dateFormat, $idField, $dashed = true)
    {
        $prefix = "FPF";
        $date = date($dateFormat);
        $query = $dashed ? "$prefix-$typePrefix-$date" : "$prefix$typePrefix$date";

        // Determine the latest record with the same prefix and date format
        $latestRecord = self::where($idField, 'like', "$query%")
            ->orderBy('id', 'desc')
            ->first();

        $number = $latestRecord ? intval(substr($latestRecord->$idField, -4)) + 1 : 1;
        $suffix = str_pad($number, 4, '0', STR_PAD_LEFT);

        return $dashed ? "$prefix-$typePrefix-$date-$suffix" : "$prefix$typePrefix$date$suffix";
    }


    public static function generateTransactionID()
    {
        $trans_prefix = 'TNX';
        return self::generateId($trans_prefix, 'Ymd', 'transaction_id', false);
    }
}