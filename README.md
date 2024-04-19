# Información del proyecto
Este proyecto está basado en # INF236-2023-2-PAR200-GRUPO-18

# Grupo 5
-Integrantes Actuales: 

* Javiera Álvarez - 201904502-4
* Giancarlos Ricci - 202130520-3
* Ignacio Jobse - 202130547-5 
* José Astudillo - 202173612-3

# Retrospectiva

## Alphas del proyecto

* Stakeholders (4/6): Cumplimos con los requisitos minimos del sistema, pero aun no está listo para poder ser desplegado, por lo cual, este aun no ha tenido un feedback.

* Opportunity (4/6): Solucion aceptable, pero no teniamos las herramientas para producirla.

* Software System (3/6): El sistema fue testeado y con errores aceptables, pero sin documentacion, por lo que aun no está listo para su uso general.

* Work (4/6): Se realizaron las operaciones basicas de software, funcionales, pero aun no es posible preever los riesgos a futuro.

* Way of working (3/6): El sistema no tiene soporte frecuentemente, ya que no todos los integrantes estaban interesados en su correcto funcionamiento.

* Team (3/5): En este proyecto no hubo una participacion activa por parte de todos los integrantes, ya que no todos tenian en el mismo interes en este.

* Requirements (3/6): Fue testeado, pero su solucion no fue llevada a cabo.

Los Alphas elegidos por nuestro grupo identificados en nuestro proyecto:

* Team: Consideramos como fundamental tener buena comunicacion y mismo enfoque entre los integrantes del proyecto para que este pueda funcionar. Para esto partiremos organizandonos y creando roles para cada integrante.

* Software System: La seguridad del sistema es un criterio fundamental para llevar a cavo nuestro proyecto, ya que nos comprometemos a garantizar y mejorar la protección de los datos a medida que avanzamos en su desarrollo.


## Riesgos 

⚠ Riesgo de Pérdida de Datos sin Sistema de Backup 

-Descripción del Riesgo: En caso de un fallo del sistema o una situación inesperada, la falta de un sistema de backup podría resultar en una pérdida irreversible de datos críticos, lo que afectaría la operatividad y la confiabilidad de las operaciones de préstamo.

-Objetivo Afectado: Integridad y disponibilidad de la información de préstamos y simulaciones de crédito.

-Impacto: Alto, ya que la pérdida de datos puede conllevar a una pérdida de confianza de los clientes y problemas legales o de cumplimiento.

-Probabilidad de Ocurrencia: Media, considerando que cualquier sistema está sujeto a posibles fallos.

-Medidas de Mitigación: Implementar un sistema de backup automatizado que realice copias de seguridad periódicas de los datos en un entorno seguro y aislado.

-Estado del Riesgo: Activo y no mitigado hasta que se establezca y verifique el sistema de backup.


⚠︎ Riesgo de Cálculos Erróneos en Simulaciones de Préstamos

-Descripción del Riesgo: Dado que las simulaciones se realizan manualmente y dependen de indicadores económicos que fluctúan, hay un riesgo significativo de cálculos incorrectos que pueden llevar a ofrecer condiciones de préstamo inadecuadas.

-Objetivo Afectado: Exactitud y confiabilidad en el procesamiento de las solicitudes de préstamos.

-Impacto: Medio, puede resultar en ofertas de préstamos no competitivas o financieramente insostenibles.

-Probabilidad de Ocurrencia: Alta, especialmente si no se cuenta con herramientas automatizadas y actualizadas.

-Medidas de Mitigación: Desarrollar e integrar una herramienta que utilice la API de la Comisión del Mercado Financiero para obtener los indicadores económicos actualizados automáticamente.

-Estado del Riesgo: Activo y no mitigado hasta que se implemente la integración con la API.

# Objetivos
Formalizar funcionamiento dentro del mercado financiero.
# Criterio de éxito 
Lograr una interacción éxitosa con instituciones como SBIF, CMF, Superintendencia de Pensiones y el Banco Central. 

# Actores relevantes
-Gerente: se encarga del funcionamiento de la financiera.

-Analista de datos: Genera informes que solicitan las entidades regulatorias. 

-Supervisor de créditos: Valida la correcta ejecución de protocolos. 

-Ejecutivo financiero: reporta y gestiona créditos con los clientes para la consolidación de información. 
