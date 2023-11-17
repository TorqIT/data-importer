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

pimcore.registerNS('pimcore.plugin.pimcoreDataImporterBundle.configuration.components.resolver.load.property');
pimcore.plugin.pimcoreDataImporterBundle.configuration.components.resolver.load.property = Class.create(pimcore.plugin.pimcoreDataImporterBundle.configuration.components.abstractOptionType, {

    type: 'property',

    buildSettingsForm: function() {

        if(!this.form) {


            this.form = Ext.create('DataHub.DataImporter.StructuredValueForm', {
                defaults: {
                    labelWidth: 200,
                    width: 600,
                    allowBlank: false,
                    msgTarget: 'under'
                },
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: t('plugin_pimcore_datahub_data_importer_configpanel_data_source_index'),
                        name: this.dataNamePrefix + 'dataSourceIndex',
                        value: this.data.dataSourceIndex,
                        store: this.configItemRootContainer.columnHeaderStore,
                        displayField: 'label',
                        valueField: 'dataIndex',
                        forceSelection: false,
                        queryMode: 'local',
                        triggerOnClick: false
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: t('plugin_pimcore_datahub_data_importer_configpanel_property_name'),
                        name: this.dataNamePrefix + 'propertyName',
                        value: this.data.propertyName
                    }
                ]
            });
        }

        return this.form;
    }

});