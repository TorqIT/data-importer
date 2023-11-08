<?php

/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - GNU General Public License version 3 (GPLv3)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    http://www.pimcore.org/license     GPLv3 and PCL
 */

namespace Pimcore\Bundle\DataImporterBundle\DataSource\Interpreter;

use OpenSpout\Reader\XLSX\Reader as XlsxReader;
use Pimcore\Bundle\DataImporterBundle\Preview\Model\PreviewData;

class XlsxFileInterpreter extends AbstractInterpreter
{
    /**
     * @var bool
     */
    protected $skipFirstRow;

    /**
     * @var string
     */
    protected $sheetName;

    protected function doInterpretFileAndCallProcessRow(string $path): void
    {
        $data = $this->getExcelData($path, $this->sheetName);

        if ($this->skipFirstRow) {
            array_shift($data);
        }

        foreach ($data as $rowData) {
            $this->processImportRow($rowData);
        }
    }

    public function fileValid(string $path, bool $originalFilename = false): bool
    {
        //if we can't open the reader, then the file is not valid
        try {
            $reader = new XlsxReader();
            $reader->open($path);
            $reader->close();
        } catch (\Exception) {
            return false;
        }

        return true;
    }

    public function previewData(string $path, int $recordNumber = 0, array $mappedColumns = []): PreviewData
    {
        $previewData = [];
        $columns = [];
        $readRecordNumber = 0;

        if ($this->fileValid($path)) {
            $data = $this->getExcelData($path, $this->sheetName);

            if ($this->skipFirstRow) {
                $firstRow = array_shift($data);
                foreach ($firstRow as $index => $columnHeader) {
                    $columns[$index] = trim($columnHeader) . " [$index]";
                }
            }

            $previewDataRow = $data[$recordNumber] ?? null;

            if (empty($previewDataRow)) {
                $previewDataRow = end($data);
                $readRecordNumber = count($data) - 1;
            } else {
                $readRecordNumber = $recordNumber;
            }

            foreach ($previewDataRow as $index => $columnData) {
                $previewData[$index] = $columnData;
            }

            if (empty($columns)) {
                $columns = array_keys($previewData);
            }
        }

        return new PreviewData($columns, $previewData, $readRecordNumber, $mappedColumns);
    }

    public function setSettings(array $settings): void
    {
        $this->skipFirstRow = $settings['skipFirstRow'] ?? false;
        $this->sheetName = $settings['sheetName'] ?? 'Sheet1';
    }

    private function getExcelData(string $file, string $sheet): array
    {
        $data = [];
        $reader = new XlsxReader();
        $reader->open($file);

        foreach ($reader->getSheetIterator() as $currentSheet) {
            if ($currentSheet->getName() != $sheet) {
                continue;
            }

            foreach ($currentSheet->getRowIterator() as $row) {
                $cells = $row->getCells();
                $dataRow = [];
                foreach ($cells as $cell) {
                    $dataRow[] = $cell->getValue();
                }
                $data[] = $dataRow;
            }
        }

        $reader->close();

        return $data;
    }
}
