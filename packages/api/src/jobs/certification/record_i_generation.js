const XlsxPopulate = require('xlsx-populate');
const i18n = require('../locales/i18n');
const boolToStringTransformation = (bool) => bool ? 'Y' : bool !== null ? 'N' : 'N/A';
const dataToCellMapping = {
  name: 'A',
  supplier: 'B',
  product_quantity: 'C',
  date_used: 'D',
  affected: 'E',
  on_permitted_substances_list: 'G',
}
const dataTransformsMapping = {
  date_used: (date) => date ? date.split('T')[0] : '',
  product_quantity: (quantity) => quantity ? quantity.toFixed(2) : 0,
}

module.exports = (data, farm_id, from_date, to_date, farm_name, isInputs) => {
  return XlsxPopulate.fromBlankAsync()
    .then((workbook) => {
      const defaultStyles = {
        verticalAlignment: 'center',
        fontFamily: 'Calibri',
        fill: 'F2F2F2',
      }

      workbook.sheet(0).range('A1:G1').style({
        bold: true,
        fontSize: 20,
        fill: 'F2F2F2',
      });
      // workbook.sheet(0).range('A6:G9').style({
      //   fill: 'F2F2F2',
      // });

      workbook.sheet(0).range('A1:G1').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A2:G2').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A3:G3').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A4:G4').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A5:G5').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A6:G6').style({ ...defaultStyles, fill: 'D9D9D9', ...getBlackBorder('bottom')  });
      workbook.sheet(0).range('A7:G7').style({ ...defaultStyles, fill: 'D9D9D9', ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A8:G8').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A9:G9').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('A10:G10').style({ ...defaultStyles, ...getBlackBorder('bottom') });
      workbook.sheet(0).range('G1:G9').style({ ...getBlackBorder('right') });
      workbook.sheet(0).range('A10:G10').style({ ...defaultStyles, wrapText: true, bold: true,
        border: {
          color: '000000',
          style: 'thin',
        },
        horizontalAlignment: 'center',
      });

      const { t } = i18n;
      const title = isInputs ? t('RECORD_I.INPUTS_UPPERCASE') : t('RECORD_I.CLEANERS_UPPERCASE');
      const RichText = XlsxPopulate.RichText;
      const rowFour = new RichText();
      const rowFive = new RichText();
      const rowSix = new RichText();
      const rowSeven = new RichText();
      const rowEight = new RichText();
      const rowNine = new RichText();
      rowFour.add(t('RECORD_I.NOTE.LIST_ALL'), { bold: true })
      rowFive.add(t('RECORD_I.NOTE.PLEASE_USE_SEPARATE_RECORD'), { bold: true })
      rowSix
        .add(`1. ${t('RECORD_I.NOTE.ONE.PART_1')} `, { bold: true })
        .add(t('RECORD_I.NOTE.ONE.PART_2'))
      rowSeven.add(`2.  ${t('RECORD_I.NOTE.TWO')}`, { bold: true });
      rowEight.add(t('RECORD_I.NOTE.PREP_INPUTS'), { bold: true });
      rowNine.add(t('RECORD_I.NOTE.LIVESTOCK_INPUTS'), { bold: true });
      workbook.sheet(0).cell('A1').value(`${t('RECORD_I.HEADER')}- ${title}`);
      workbook.sheet(0).cell('A2').value(t('OPERATION_NAME'));
      workbook.sheet(0).cell('B2').value(farm_name);
      workbook.sheet(0).cell('E2').value(`${t('RECORD_I.REPORTING_PERIOD')}: `);
      workbook.sheet(0).cell('F2').value(from_date + ' - ' + to_date);
      workbook.sheet(0).cell('A3').value(t('RECORD_I.INPUT_CATEGORY'));
      workbook.sheet(0).cell('B3').value(isInputs ? t('RECORD_I.SOIL_AMENDMENTS') : t('RECORD_I.CLEANERS'));
      workbook.sheet(0).cell('A4').value(rowFour).style({ wrapText: false });
      workbook.sheet(0).cell('A5').value(rowFive).style({ wrapText: false });
      workbook.sheet(0).cell('A6').value(rowSix).style({ wrapText: false });
      workbook.sheet(0).cell('A7').value(rowSeven).style({ wrapText: false });
      workbook.sheet(0).cell('A8').value(rowEight).style({ wrapText: false });
      workbook.sheet(0).cell('A9').value(rowNine).style({ wrapText: false });
      workbook.sheet(0).cell('A10').value(t('RECORD_I.TABLE_COLUMN.PRODUCT_NAME'));
      workbook.sheet(0).cell('B10').value(t('RECORD_I.TABLE_COLUMN.SUPPLIER'));
      workbook.sheet(0).cell('C10').value(t('RECORD_I.TABLE_COLUMN.QUANTITY'));
      workbook.sheet(0).cell('D10').value(t('RECORD_I.TABLE_COLUMN.DATE_USED'));
      workbook.sheet(0).cell('E10').value(t('RECORD_I.TABLE_COLUMN.CROP_FIELD_APPLIED_TO'));
      workbook.sheet(0).cell('F10').value(t('RECORD_I.TABLE_COLUMN.NOTES'));
      workbook.sheet(0).cell('G10').value(t('RECORD_I.TABLE_COLUMN.LISTED_IN_PSL'));
      workbook.sheet(0).column('A').width(31);
      workbook.sheet(0).column('B').width(34);
      workbook.sheet(0).column('C').width(19);
      workbook.sheet(0).column('D').width(15);
      workbook.sheet(0).column('E').width(33);
      workbook.sheet(0).column('F').width(35);
      workbook.sheet(0).column('G').width(11);
      workbook.sheet(0).row(2).height(23);
      workbook.sheet(0).row(3).height(23);
      workbook.sheet(0).row(4).height(23);
      workbook.sheet(0).row(5).height(23);
      workbook.sheet(0).row(6).height(23);
      workbook.sheet(0).row(7).height(23);
      workbook.sheet(0).row(8).height(23);
      workbook.sheet(0).row(9).height(23);
      workbook.sheet(0).row(10).height(40);

      data.map((row, i) => {
        const rowN = i + 11;

        // set affected text
        row.affected = row.affectedLocations
          .reduce((reducedString, { name }, i) =>
            `${reducedString}${i === 0 ? '' : ', '}${name}`
          , `${t('RECORD_I.LOCATIONS')}: `);
        row.affected += row.affectedManagementPlans
          .reduce((reducedString, { crop_variety_name, crop_translation_key }, i) =>
            `${reducedString}${i === 0 ? '' : ', '}${crop_variety_name} (${t(`crop:${crop_translation_key}`)})`
          , `\n${t('RECORD_I.VARIETALS')}: `);
        delete row.affectedLocations;
        delete row.affectedManagementPlans;

        Object.keys(row).filter(k => k !== 'task_id').map((k) => {
          const cell = `${dataToCellMapping[k]}${rowN}`;
          const value = dataTransformsMapping[k] ? dataTransformsMapping[k](row[k]) : row[k];
          workbook.sheet(0).cell(cell).value(value);
        })
      })
      return workbook.toFileAsync(`${process.env.EXPORT_WD}/temp/${farm_name}/iCertify-RecordI-${title}.xlsx`);
    })
}

function getBlackBorder(direction) {
  return {
    [`${direction}Border`] : {
      color: '000000',
      style: 'thin',
    },
  }
}
