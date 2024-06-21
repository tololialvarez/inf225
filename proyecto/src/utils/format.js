const formatearMillones = (nNmb) => {
    let sRes = '';
    for (let j = 0, i = nNmb.length - 1; i >= 0; i--, j++)
      sRes = nNmb.charAt(i) + (j > 0 && j % 3 === 0 ? '.' : '') + sRes;
    return sRes;
  };

  const formateaRut = (rutInit) => {
    let rut = rutInit;
  
    if (!rut || (rut.length && !/^[0-9]+$/.test(rut[0]))) {
      return '';
    }
    const ultimoDigito = rut.substr(rut.length - 1, 1);
    const terminaEnK = ultimoDigito.toLowerCase() === 'k';
    rut = rut.replace(/\D/g, '');
    let dv = rut.substr(rut.length - 1, 1);
    if (!terminaEnK) {
      rut = rut.substr(0, rut.length - 1);
    } else {
      dv = 'K';
    }
    if (rut && dv) {
      return `${formatearMillones(rut)}-${dv}`;
    }
    return rutInit;
  };

  const checkRut = (rut) => {
    let valor = rut.replace('.', '');
    valor = valor.replace('-', '');
    valor = valor.replace('.', '');
    const cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    let suma = 0;
    let multiplo = 2;
  
    if (cuerpo.length < 7) return false;
  
    for (let i = 1; i <= cuerpo.length; i++) {
      const index = multiplo * valor.charAt(cuerpo.length - i);
      suma += index;
      if (multiplo < 7) {
        multiplo += 1;
      } else {
        multiplo = 2;
      }
    }
  
    const dvEsperado = 11 - (suma % 11);
    const dvNumber = dv === 'K' ? 10 : parseInt(dv, 10);
    dv = dvNumber === 0 ? 11 : dvNumber;
  
    if (parseInt(dvEsperado, 10) !== parseInt(dv, 10)) {
      return false;
    }
    return true;
  };

  function formatAmount(value, isDecimal) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: isDecimal ? 2 : 0,
    }).format(value);
  }

  export {formatearMillones, formateaRut, checkRut, formatAmount}