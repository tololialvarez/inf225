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

El Alpha "Opportunity" ha sido identificado como uno de los Alphas más cruciales para nuestro proyecto en su estado actual de "Viable". A continuación, se presentan las medidas concretas y operacionales que hemos planeado para progresar hacia el siguiente estado:
![image](https://github.com/tololialvarez/inf225/assets/165517658/154251bf-74ef-44d7-ba30-60e6f40eb2e9)
Prueba de Concepto y Prototipos:
Crea un prototipo más avanzado o una prueba de concepto que demuestre la viabilidad técnica de la solución y cómo se operará de forma deseada.

Planificación:
Desarrolla un plan que contemple las fases de crecimiento y escalabilidad de la solución a largo plazo.

Análisis de la Competencia:
Identifica y analiza a los competidores directos e indirectos, sus fortalezas y debilidades, y cómo tu solución se compara y se diferencia.

## Riesgos 

Riesgo de Pérdida de Datos sin Sistema de Backup

Descripción del Riesgo: En caso de un fallo del sistema o una situación inesperada, la falta de un sistema de backup podría resultar en una pérdida irreversible de datos críticos, lo que afectaría la operatividad y la confiabilidad de las operaciones de préstamo.
Objetivo Afectado: Integridad y disponibilidad de la información de préstamos y simulaciones de crédito.
Impacto: Alto, ya que la pérdida de datos puede conllevar a una pérdida de confianza de los clientes y problemas legales o de cumplimiento.
Probabilidad de Ocurrencia: Media, considerando que cualquier sistema está sujeto a posibles fallos.
Medidas de Mitigación: Implementar un sistema de backup automatizado que realice copias de seguridad periódicas de los datos en un entorno seguro y aislado.
Estado del Riesgo: Activo y no mitigado hasta que se establezca y verifique el sistema de backup.
Riesgo de Cálculos Erróneos en Simulaciones de Préstamos

Descripción del Riesgo: Dado que las simulaciones se realizan manualmente y dependen de indicadores económicos que fluctúan, hay un riesgo significativo de cálculos incorrectos que pueden llevar a ofrecer condiciones de préstamo inadecuadas.
Objetivo Afectado: Exactitud y confiabilidad en el procesamiento de las solicitudes de préstamos.
Impacto: Medio, puede resultar en ofertas de préstamos no competitivas o financieramente insostenibles.
Probabilidad de Ocurrencia: Alta, especialmente si no se cuenta con herramientas automatizadas y actualizadas.
Medidas de Mitigación: Desarrollar e integrar una herramienta que utilice la API de la Comisión del Mercado Financiero para obtener los indicadores económicos actualizados automáticamente.
Estado del Riesgo: Activo y no mitigado hasta que se implemente la integración con la API.
