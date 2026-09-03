"use strict";

function ieaEscapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ieaBuildSignature(profile) {
  var name = ieaEscapeHtml(profile.displayName || profile.emailAddress || "IEA");
  return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;border-collapse:collapse;"><tr><td height="14" style="height:14px;line-height:14px;font-size:1px;">&nbsp;</td></tr></table>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" bgcolor="#ffffff" style="width:600px;border-collapse:collapse;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;"><tr>' +
    '<td width="155" valign="middle" style="width:155px;padding:18px 20px;text-align:center;vertical-align:middle;"><a href="https://www.iea.com.ar/" target="_blank"><img src="https://ieasrl.github.io/firma-iea-assets/iea-logo-email.png" width="120" alt="IEA" style="display:block;width:120px;height:auto;margin:0 auto;border:0;"></a></td>' +
    '<td width="1" bgcolor="#159bd3" style="width:1px;background-color:#159bd3;font-size:0;line-height:0;">&nbsp;</td>' +
    '<td valign="middle" style="padding:16px 20px;vertical-align:middle;">' +
    '<div style="font-size:15px;line-height:19px;font-weight:bold;color:#17588b;">' + name + '</div>' +
    '<div style="height:9px;line-height:9px;font-size:1px;">&nbsp;</div>' +
    '<div style="font-size:11px;line-height:16px;font-weight:bold;color:#444444;">Ingeniería Electrónica Argentina S.R.L.</div>' +
    '<div style="padding-top:4px;font-size:10px;line-height:14px;color:#666666;">Av. Eva Perón 4468 · Rosario · Santa Fe · Argentina</div>' +
    '<div style="padding-top:3px;font-size:10px;line-height:14px;color:#666666;">Tel. +54 341 4374040 / 4390800 · Cel. +54 9341 500-8003</div>' +
    '<div style="padding-top:3px;font-size:10px;line-height:14px;"><a href="https://www.iea.com.ar/" target="_blank" style="color:#1769aa;text-decoration:none;">www.iea.com.ar</a></div>' +
    '</td></tr></table>';
}

function ieaShowResult(event, message) {
  Office.context.mailbox.item.body.prependAsync(
    '<div style="padding:6px;color:#a4262c;font:12px Arial;">' + ieaEscapeHtml(message) + '</div>',
    { coercionType: Office.CoercionType.Html },
    function () { event.completed(); }
  );
}

function insertIeaSignature(event) {
  var item;
  try {
    item = Office.context.mailbox.item;
    item.subject.setAsync("[IEA EVENTO 2.3 OK]", function (subjectResult) {
      if (subjectResult.status !== Office.AsyncResultStatus.Succeeded) {
        ieaShowResult(event, "IEA: el evento abrió, pero falló subject.setAsync: " + subjectResult.error.message);
        return;
      }

      item.body.setSignatureAsync(
        ieaBuildSignature(Office.context.mailbox.userProfile || {}),
        { coercionType: Office.CoercionType.Html },
        function (signatureResult) {
          if (signatureResult.status !== Office.AsyncResultStatus.Succeeded) {
            ieaShowResult(event, "IEA: el evento abrió, pero falló setSignatureAsync: " + signatureResult.error.code + " - " + signatureResult.error.message);
            return;
          }
          event.completed();
        }
      );
    });
  } catch (error) {
    if (item && item.body) {
      ieaShowResult(event, "IEA: excepción en el runtime: " + (error && error.message ? error.message : String(error)));
    } else {
      event.completed();
    }
  }
}

Office.actions.associate("insertIeaSignature", insertIeaSignature);
