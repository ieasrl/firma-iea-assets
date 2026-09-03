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
  return '<span style="display:none!important;mso-hide:all;font-size:1px;line-height:1px;color:#ffffff;">IEA-AUTORUN-V3</span>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="650" style="width:650px;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr><td height="18" style="height:18px;line-height:18px;font-size:1px;">&nbsp;</td></tr></table>' +
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="650" bgcolor="#ffffff" style="width:650px;border-collapse:collapse;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;mso-table-lspace:0pt;mso-table-rspace:0pt;"><tr>' +
    '<td width="175" valign="middle" style="width:175px;padding:22px 25px;text-align:center;vertical-align:middle;"><a href="https://www.iea.com.ar/" target="_blank" style="text-decoration:none;"><img src="https://ieasrl.github.io/firma-iea-assets/iea-logo-email.png" width="135" alt="IEA - Ingeniería Electrónica Argentina" style="display:block;width:135px;height:auto;margin:0 auto;border:0;outline:none;text-decoration:none;"></a></td>' +
    '<td width="1" bgcolor="#159bd3" style="width:1px;background-color:#159bd3;font-size:0;line-height:0;">&nbsp;</td>' +
    '<td valign="middle" style="padding:20px 25px;vertical-align:middle;">' +
    '<div style="font-size:19px;line-height:23px;font-weight:bold;color:#17588b;">' + name + '</div>' +
    '<div style="height:12px;line-height:12px;font-size:1px;">&nbsp;</div>' +
    '<div style="font-size:13px;line-height:18px;font-weight:bold;color:#444444;">Ingeniería Electrónica Argentina S.R.L.</div>' +
    '<div style="padding-top:5px;font-size:12px;line-height:17px;color:#666666;">Av. Eva Perón 4468 · Rosario · Santa Fe · Argentina</div>' +
    '<div style="padding-top:4px;font-size:12px;line-height:17px;color:#666666;">Tel. +54 341 4374040 / 4390800 · Cel. +54 9341 500-8003</div>' +
    '<div style="padding-top:4px;font-size:12px;line-height:17px;"><a href="https://www.iea.com.ar/" target="_blank" style="color:#1769aa;text-decoration:none;">www.iea.com.ar</a></div>' +
    '<div style="height:13px;line-height:13px;font-size:1px;">&nbsp;</div>' +
    '<div style="font-size:11px;line-height:15px;font-weight:bold;color:#17588b;">ISO 9001:2015</div>' +
    '<div style="padding-top:2px;font-size:10px;line-height:14px;color:#777777;">Sistema de Gestión de la Calidad</div>' +
    '<div style="padding-top:4px;font-size:9px;line-height:13px;color:#888888;">IRAM ISO 9001-2015: RI 9000-14813 - Diseño y ejecución de proyectos de automatización de procesos de producción de plantas industriales. Prestación del servicio de diagnóstico de la automatización existente y mantenimiento del software asociado.</div>' +
    '</td></tr></table>';
}

function insertIeaSignature(event) {
  try {
    var profile = Office.context.mailbox.userProfile || {};
    Office.context.mailbox.item.body.setSignatureAsync(
      ieaBuildSignature(profile),
      { coercionType: Office.CoercionType.Html },
      function () { event.completed(); }
    );
  } catch (_) {
    event.completed();
  }
}

Office.actions.associate("insertIeaSignature", insertIeaSignature);
