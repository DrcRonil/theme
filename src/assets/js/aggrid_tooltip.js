
function ShowTooltipTableViewRAmt(MTypeAmt, Type)
{
    var HeaderName = Type;

    var htmlTable = '';
    htmlTable = htmlTable + '<table id=tblMTypeAmt border="0" align="center" cellpadding="1" cellspacing="1" style="background-color: #ffffff; padding: 1px;color:black;">';
    htmlTable = htmlTable + '<tr style="background-color: #d8d8d8;">';
    htmlTable = htmlTable + '<td width="60" height="20" style="text-align:center;font-weight:bold;">ECode</td>';
    htmlTable = htmlTable + '<td width="80" height="20" style="text-align:center;font-weight:bold;">Date</td>';
    htmlTable = htmlTable + '<td width="40" height="20" style="text-align:center;font-weight:bold;">Pcs</td>';
    htmlTable = htmlTable + '<td width="50" height="20" style="text-align:center;font-weight:bold;">Weight</td>';
    htmlTable = htmlTable + '<td width="40" height="20" style="text-align:center;font-weight:bold;">RAmt</td>';
    htmlTable = htmlTable + '<td width="40" height="20" style="text-align:center;font-weight:bold;">Rate</td>';
    htmlTable = htmlTable + '</tr>';

    MTypeAmt = MTypeAmt.toString().replaceAll('|', ' ');
    var ArrayParamRows = MTypeAmt.toString().split(',');
    var TotalAmt = 0;
    for (var i = 0; i < ArrayParamRows.length; i++) {
        var ArrayParamCols = ArrayParamRows[i].split(':');

        htmlTable = htmlTable + '<tr>';

        if (i == 0)
            htmlTable = htmlTable + '<td width="60" rowspan="' + ArrayParamRows.length + '"style="text-align:center;">' + ArrayParamCols[0] + '</td>';

        htmlTable = htmlTable + '<td width="60" height="20" style="text-align:center;">' + ArrayParamCols[1] + '</td>';
        htmlTable = htmlTable + '<td width="80" height="20" style="text-align:center;">' + ArrayParamCols[2] + '</td>';
        htmlTable = htmlTable + '<td width="40" height="20" style="text-align:center;">' + ArrayParamCols[3] + '</td>';
        htmlTable = htmlTable + '<td width="40" height="20" style="text-align:center;">' + ArrayParamCols[4] + '</td>';
        htmlTable = htmlTable + '<td width="40" height="20" style="text-align:center;">' + ArrayParamCols[5] + '</td>';
        htmlTable = htmlTable + '</tr>';

        TotalAmt = Number(TotalAmt) + Number(ArrayParamCols[1]);
    }
    htmlTable = htmlTable + '</table>';

    Tip(htmlTable, WIDTH, 0, TITLE, '', FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true, ABOVE, true);
    return false;
}