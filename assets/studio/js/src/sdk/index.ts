/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Public SDK surface of the data-importer Studio remote, exposed as the '.'
// module-federation entry (the plugin descriptor lives on './plugins').
export { MappingStep } from '../modules/data-importer/components/tabs/steps/mapping-step';
export type { MappingStepProps } from '../modules/data-importer/components/tabs/steps/mapping-step';
export {
    useBundleDataImporterConfigGetQuery,
    useBundleDataImporterConfigSaveMutation,
} from '../modules/data-importer/data-importer-api-slice-enhanced';
export { useBundleDataImporterConfigCopyPreviewMutation } from '../modules/data-importer/data-importer-api-slice.gen';
export type {
    BundleDataImporterConfigCopyPreviewApiArg,
    BundleDataImporterCopyPreviewParameters,
    BundleDataImporterConfigSaveApiArg,
    BundleDataImporterConfigurationSaveParameters,
} from '../modules/data-importer/data-importer-api-slice.gen';
export { transformBackendToForm, transformFormToBackend } from '../modules/data-importer/utils/transformers';
export type { BackendConfiguration } from '../modules/data-importer/utils/transformers';
export type { DataImporterFormValues } from '../modules/data-importer/types';
