"use strict";

function ieaEscapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Bloque fijo de la firma (diseno definitivo, tabla de 800px con logo +
// borde divisor). Todos los caracteres acentuados van como entidades HTML
// (&oacute;, &ntilde;, etc.) para blindarlo contra problemas de encoding
// del navegador al cargar este .js como recurso externo.
var IEA_SIGNATURE_TEMPLATE = '<table cellpadding="0" cellspacing="0" border="0" width="800" style="font-family:Arial,Helvetica,sans-serif; border-collapse:collapse; table-layout:fixed; width:800px;" id="main-data"><tr><td width="150" style="width:150px; padding:6px 20px 4px 0; border-right:2px solid #17588B; vertical-align:top;" valign="top" align="center"><img src="data:image/jpeg;base64,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"width="135"style="display:block;margin:0 auto;max-width:135px;height:auto;"alt="IEA"></td><td width="630" style="width:630px; padding:0 0 4px 20px; vertical-align:top;" valign="top"><p style="margin:0 0 0px 0; padding:0; "><span style="font-size:10pt; mso-ansi-font-size:10pt; mso-bidi-font-size:10pt; font-family:Arial,Helvetica,sans-serif; color:#17588B; font-weight:bold;">%%DisplayName%%</span></p><p style="margin:0 0 8px 0; padding:0; "><span style="font-size:7.5pt; mso-ansi-font-size:7.5pt; mso-bidi-font-size:7.5pt; font-family:Arial,Helvetica,sans-serif; color:#666666; font-weight:normal;">%%Title%%</span></p><p style="margin:0 0 2px 0; padding:0; "><span style="font-size:9pt; mso-ansi-font-size:9pt; mso-bidi-font-size:9pt; font-family:Arial,Helvetica,sans-serif; color:#444444; font-weight:bold;">Ingenier&iacute;a Electr&oacute;nica Argentina S.R.L.</span></p><p style="margin:0 0 1px 0; padding:0; "><span style="font-size:7.5pt; mso-ansi-font-size:7.5pt; mso-bidi-font-size:7.5pt; font-family:Arial,Helvetica,sans-serif; color:#666666; font-weight:normal;">Av. Eva Per&oacute;n 4468 &nbsp;&middot;&nbsp; Rosario &nbsp;&middot;&nbsp; Santa Fe &nbsp;&middot;&nbsp; Argentina</span></p><p style="margin:0 0 2px 0; padding:0; "><span style="font-size:7.5pt; mso-ansi-font-size:7.5pt; mso-bidi-font-size:7.5pt; font-family:Arial,Helvetica,sans-serif; color:#666666; font-weight:normal;">Tel. +54 341 4374040 / 4390800 / 3415008003 int 156</span></p><p style="margin:0 0 8px 0; padding:0; "><span style="font-size:7.5pt; mso-ansi-font-size:7.5pt; mso-bidi-font-size:7.5pt; font-family:Arial,Helvetica,sans-serif; color:#17588B; font-weight:normal;"><a href="https://www.iea.com.ar" style="font-size:7.5pt; mso-ansi-font-size:7.5pt; mso-bidi-font-size:7.5pt; color:#17588B; text-decoration:underline;">www.iea.com.ar</a></span></p><p style="margin:0 0 0px 0; padding:0; "><span style="font-size:7.5pt; mso-ansi-font-size:7.5pt; mso-bidi-font-size:7.5pt; font-family:Arial,Helvetica,sans-serif; color:#17588B; font-weight:bold;">ISO 9001:2015</span></p><p style="margin:0 0 3px 0; padding:0; "><span style="font-size:7pt; mso-ansi-font-size:7pt; mso-bidi-font-size:7pt; font-family:Arial,Helvetica,sans-serif; color:#777777; font-weight:normal;">Sistema de Gesti&oacute;n de la Calidad</span></p><p style="margin:0 0 0px 0; padding:0; line-height:8.5pt; mso-line-height-rule:exactly;"><span style="font-size:7pt; mso-ansi-font-size:7pt; mso-bidi-font-size:7pt; font-family:Arial,Helvetica,sans-serif; color:#8a8a8a; font-weight:normal;">IRAM ISO 9001-2015: RI 9000-14813 - Dise&ntilde;o y ejecuci&oacute;n de proyectos de automatizaci&oacute;n de procesos de producci&oacute;n de plantas industriales. Prestaci&oacute;n del servicio de diagn&oacute;stico de la automatizaci&oacute;n existente y mantenimiento del software asociado.</span></p></td></tr></table>';

function ieaBuildSignature(profile) {
  var name = ieaEscapeHtml(profile.displayName || profile.emailAddress || "IEA");
  var title = ieaEscapeHtml(profile.jobTitle || "");
  return IEA_SIGNATURE_TEMPLATE
    .replace("%%DisplayName%%", name)
    .replace("%%Title%%", title);
}

// Intenta traer nombre + puesto reales desde Microsoft Graph via SSO.
// Si el add-in todavia no tiene el WebApplicationInfo/App Registration
// configurado, esto va a fallar silenciosamente y se usa el fallback de abajo.
async function ieaGetProfileFromGraph() {
  try {
    var token = await OfficeRuntime.auth.getAccessToken({ allowSignInPrompt: true, allowConsentPrompt: true });
    var resp = await fetch("https://graph.microsoft.com/v1.0/me?$select=displayName,jobTitle", {
      headers: { Authorization: "Bearer " + token }
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch (e) {
    return null;
  }
}

function ieaShowResult(event, message) {
  Office.context.mailbox.item.body.prependAsync(
    '<div style="padding:6px;color:#a4262c;font:12px Arial;">' + ieaEscapeHtml(message) + '</div>',
    { coercionType: Office.CoercionType.Html },
    function () { event.completed(); }
  );
}

async function insertIeaSignature(event) {
  var item;
  try {
    item = Office.context.mailbox.item;

    var profile = await ieaGetProfileFromGraph();
    if (!profile) {
      // Fallback sin SSO: solo tenemos nombre/email, el puesto queda vacio.
      profile = Office.context.mailbox.userProfile || {};
    }

    item.body.setSignatureAsync(
      ieaBuildSignature(profile),
      { coercionType: Office.CoercionType.Html },
      function (signatureResult) {
        if (signatureResult.status !== Office.AsyncResultStatus.Succeeded) {
          ieaShowResult(event, "IEA: fallo setSignatureAsync: " + signatureResult.error.code + " - " + signatureResult.error.message);
          return;
        }
        event.completed();
      }
    );
  } catch (error) {
    if (item && item.body) {
      ieaShowResult(event, "IEA: excepcion en el runtime: " + (error && error.message ? error.message : String(error)));
    } else {
      event.completed();
    }
  }
}

Office.actions.associate("insertIeaSignature", insertIeaSignature);
