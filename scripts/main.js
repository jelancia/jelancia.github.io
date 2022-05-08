const filesAllow = ['jelancia_core.dll', 'Elancia.exe', 'jElancia.exe'];
const hashMaps = {
    'B1843AB0093917781284126784344C89158A72B2D6E36DC1B1002D0500F013D5': '신버전 풀모드 jelancia_core.dll',
    'F090F2944C930502662A055BAAFE2477361F2F88': '신버전 풀모드 jelancia_core.dll',
    'C245E5D8F7EA66FB7E9AA3252DAE8BD5': '신버전 풀모드 jelancia_core.dll',
    'BA48AC040E1C31A8A9EAFE569BF6CC83A290600E6F0F266903B1EB77E838DDE7': '신버전 창모드 jelancia_core.dll',
    '70F90FD43FED0CAE0F3AF90F68327D87961983EF': '신버전 창모드 jelancia_core.dll',
    '450708F81EF9E63E807DC41B64EB8F65': '신버전 창모드 jelancia_core.dll',
    '4283CB2712F2E53DDCF2754264D66B198811E2B907B52488ED77B1B7D07788FA': '신(구)버전 풀모드 jelancia_core.dll',
    '5C437D3C8DB7E34D1560962A40494F95758AD419': '신(구)버전 풀모드 jelancia_core.dll',
    '9496390FA5C761D3BC307DB78FB3073C': '신(구)버전 풀모드 jelancia_core.dll',
    'EE0238E59978317918BA1C3F4A604421CEE8FB66DC032BBC8B91BBE725A31B5E': '신(구)버전 창모드 jelancia_core.dll',
    'FE662FA74FE24332AA696CF2218BE4EDAB2E9785': '신(구)버전 창모드 jelancia_core.dll',
    'CA653E98C8EF2D4AA36889CE9FA469AB': '신(구)버전 창모드 jelancia_core.dll',
    'D70433B763106A258135FBA32C6DFCD4A598E3D3E47516EFE5E159EB0243C08E': '신버전 jElancia.exe',
    'E7532FAFE937DE013DC6B5E8D1E30116CBC30F7E': '신버전 jElancia.exe',
    'E8FADED66F8E88589E8CD3F36450584E': '신버전 jElancia.exe',
    'BD700F240F809EA9B13A2D94506954D33298FFA78067948E52E6919A4EF22D2E': '신버전 Elancia.exe',
    '7DC3371832F8F36A809AFFF0FC39C47A97664BB5': '신버전 Elancia.exe',
    '4875BD0A3C4867B6D5B15CA41CEAA6E7': '신버전 Elancia.exe',
};

var printResult = function(html) {
    $('#filecheckresult').html(html);
};

var execute = function(file) {
    reader = new FileReader();

    reader.onload = function (event) {
        try {
            var tsha256 = sha256(event.target.result).toUpperCase();
            var tsha1 = sha1(event.target.result).toUpperCase();
            var tmd5 = md5(event.target.result).toUpperCase();

            var rsha256 = hashMaps[tsha256];
            var rsha1 = hashMaps[tsha1];
            var rmd5 = hashMaps[tmd5];

            console.log(rmd5);

            var ret = ((rsha256 != undefined) && (rsha256 == rsha1) && (rsha256 == rmd5));
            var hashHtml = '<p style="font-size:12px;"><br>md5: ' + tmd5 +'<br>sha1: ' + tsha1 +'<br>sha256: ' + tsha256 +'</p>';

            if (ret) {
                printResult('<span style="color:#0097ff;">'+ rsha256 + '입니다</span>' + hashHtml);
            }
            else {
                printResult('<span style="color:#ff0000;">업로드하신 ' + file.name +'은 최신버전 파일이 아닙니다. 바이러스 의심됨.</span>' + hashHtml);
            }
        } catch (e) {
            console.log(e);
        }
    };

    reader.readAsArrayBuffer(file);
};

$(document).ready(function() {
    var input = $('#input');

    input.bind('change', function() {
        var file = input[0].files[0];

        if (filesAllow.indexOf(file.name) == -1) {
            printResult('jelancia_core.dll, Elancia.exe, jElancia.exe 이외 파일은 검사 할 수 없습니다.');
            return false;
        }

        execute(file);
    });
});
