document.addEventListener('DOMContentLoaded', () => {
    // ===========================
    // TAB NAVIGATION
    // ===========================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // ===========================
    // ORIGINAL MANUAL FUNCTIONALITY
    // ===========================
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const promptOutput = document.getElementById('prompt-output');

    let isTyping = false;

    const typeWriter = (text, element, speed = 5, callback = null) => {
        isTyping = true;
        element.textContent = '';
        element.classList.add('typing');
        let i = 0;

        function type() {
            if (i < text.length) {
                const chunk = text.substring(i, i + 3);
                element.textContent += chunk;
                i += 3;
                setTimeout(type, speed);
                element.scrollTop = element.scrollHeight;
            } else {
                element.classList.remove('typing');
                isTyping = false;
                if (callback) callback();
            }
        }
        type();
    };

    // ===========================
    // AUTO-FILL EJEMPLO MANUAL
    // ===========================
    const fillManualBtn = document.getElementById('fill-example-manual-btn');
    if (fillManualBtn) {
        fillManualBtn.addEventListener('click', () => {
            document.getElementById('course-name').value = 'Intervención en Crisis y Primeros Auxilios Psicológicos (PAP)';
            document.getElementById('target-audience').value = 'Agentes de Salud y Preventores Comunitarios';
            document.getElementById('organisms').value = 'Dirección de Salud Comunitaria';
            document.getElementById('tech-team').value = 'Equipo de Salud Mental';
            document.getElementById('problem-concept').value = 'El impacto emocional ante situaciones de desastre o trauma agudo requiere de herramientas de contención inmediatas. La falta de intervención temprana agrava el estrés postraumático.';
            document.getElementById('model-intervention').value = 'triple-fase';
            
            // Check some experts
            document.getElementById('expert-pedagogical').checked = true;
        });
    }

    const modelGuidelines = {
        'gemini': `[OPTIMIZACIÓN GEMINI]: Aprovecha la amplia ventana de contexto. Genera respuestas estructuradas y detalladas. Prioriza la claridad conceptual y la integración de todos los componentes del manual de abordaje.`,
        'chatgpt': `[OPTIMIZACIÓN GPT-4]: Utiliza un razonamiento paso a paso (Chain of Thought). Estructura la salida con Markdown riguroso. Asegura que cada sección cumpla con los lineamientos preventivos establecidos.`,
        'perplexity': `[OPTIMIZACIÓN PERPLEXITY]: Prioriza la investigación en tiempo real y la citación de fuentes actualizadas. Busca datos estadísticos y referencias bibliográficas recientes sobre la problemática.`
    };

    const expertLayers = {
        'standard': `[MODO: PROFESOR SENIOR]: Actúa como un experto docente con años de experiencia en la temática. Tu enfoque es la claridad pedagógica y la estructura lógica.`,
        'pedagogical': `[MODO: COMITÉ PEDAGÓGICO]: Simula un diálogo interno entre:\n1. UN PEDAGOGO: Enfocado en la transposición didáctica.\n2. UN ARQUITECTO DE CONTENIDOS: Enfocado en la jerarquía y el ritmo.`,
        'full': `[MODO: DEEP-AGENTIC ADVISORY]: Simula un comité de alto nivel compuesto por:\n1. EXPERTO PEDAGÓGICO: Valida la didáctica.\n2. DISEÑADOR UX EDUCATIVO: Asegura el engagement.\n3. CORRECTOR DE ESTILO INSTITUCIONAL: Garantiza que el tono sea impecable.`,
        'director': `[MODO: COMITÉ DIRECTIVO]: Actúa como una mesa de Directores Estratégicos. Tu enfoque es la Visión Institucional y el Impacto Social.`,
        'coordination': `[MODO: MESA DE COORDINACIÓN]: Simula la articulación entre Coordinadores de área. Tu enfoque es la factibilidad operativa y estandarización.`,
        'agentes': `[MODO: AGENTES DE CAMBIO]: Actúa como un colectivo de Agentes de Innovación enfocado en la transformación social.`
    };

    generateBtn.addEventListener('click', () => {
        if (isTyping) return;

        const courseName = document.getElementById('course-name').value || '[Nombre del Curso]';
        const organisms = document.getElementById('organisms').value || 'Organismos Institucionales';
        const techTeam = document.getElementById('tech-team').value || 'Equipo Técnico de Desarrollo';
        const problemConcept = document.getElementById('problem-concept').value || '';
        const targetAudience = document.getElementById('target-audience').value || '';
        
        const selectedModel = document.querySelector('input[name="ai-model"]:checked')?.value || 'gemini';
        const modelGuideline = modelGuidelines[selectedModel] || '';

        const selectedExperts = Array.from(document.querySelectorAll('input[name="expert-layer"]:checked')).map(cb => cb.value);
        let expertLayer = '';
        if (selectedExperts.length === 0) {
            expertLayer = expertLayers['standard'];
        } else {
            const combinedInstructions = selectedExperts.map(val => expertLayers[val]).join('\n\n');
            expertLayer = `[COMITÉ MULTI-AGENTE APLICADO]\nSimula un consenso entre los siguientes roles expertos:\n\n${combinedInstructions}`;
        }

        const prompt = `${modelGuideline}

### SYSTEM ROLE (R)
${expertLayer}
Tu objetivo es generar un manual de abordaje integral y formación profesional siguiendo una estructura de 11 puntos clave.

### OBJECTIVE (O)
Generar un contenido exhaustivo para el curso "${courseName}" enfocado en el abordaje integral y preventivo.

### CONTEXT & PARAMETERS (C)
- **Curso:** ${courseName}
- **Institución:** Formando Capital Humano.
- **Problemática:** ${problemConcept}
- **Población Destino:** ${targetAudience}

### EXECUTION STEPS (E) - ESTRUCTURA OBLIGATORIA (11 PUNTOS)

Por favor, desarrolla el contenido siguiendo estrictamente esta estructura:

1. **PORTADA E IDENTIFICACIÓN INSTITUCIONAL**: Incluir nombre del curso, organismos responsables (${organisms}) y el equipo técnico (${techTeam}).
2. **INTRODUCCIÓN Y PROPÓSITO PEDAGÓGICO**: Definir la complejidad de la temática y el objetivo formativo. Establecer que la problemática es multicausal y requiere un abordaje integral.
3. **MARCO CONCEPTUAL (LA BASE TEÓRICA)**: Explorar la etapa vital involucrada y sus desafíos específicos. Definir al sujeto de estudio, sus riesgos y desafíos actuales (entorno digital, incertidumbre).
4. **EVIDENCIA EPIDEMIOLÓGICA Y DATOS**: Dimensionar el problema mediante estadísticas. Incluir tendencias por género o edad.
5. **DESMITIFICACIÓN Y CREENCIAS (MITOS VS. REALIDAD)**: Desarrollar una TABLA COMPARATIVA que contraste "Creencias Populares" con "Evidencia Científica/Realidad".
6. **PROCESO DE INTERVENCIÓN (FASES DEL MODELO)**: Dividir en tres momentos cronológicos: Alerta Temprana, Atención/Seguimiento y Posvención (o reparación).
7. **FACTORES DE RIESGO Y PROTECCIÓN (ANÁLISIS PLURIFACTORIAL)**: Categorizar en:
   - Predisponentes/Vulnerabilidad (Largo plazo).
   - Precipitantes (Corto plazo).
   - Protectores (Soportes afectivos y redes).
8. **SEÑALES DE ALERTA E INDICADORES (DETECCIÓN)**: Detallar manifestaciones verbales y no verbales, cambios de humor, aislamiento y crisis.
9. **GUÍA PRÁCTICA DE ACCIÓN (HERRAMIENTAS DE COMUNICACIÓN)**: Incluir técnicas de "Primera Escucha": Escucha activa, empatía y validación emocional sin juzgar.
10. **MARCO NORMATIVO Y CORRESPONSABILIDAD**: Encuadrar en leyes nacionales e internacionales relevantes (Salud Mental, Derechos). Definir el rol del Sistema de Protección Integral.
11. **RECURSOS DE EMERGENCIA Y BIBLIOGRAFÍA**: Incluir líneas de atención gratuitas y una lista de referencias bibliográficas sólidas en Normas APA 7.

### TONE & STYLE (T)
Tono claro, profesional, empático y preventivo. Evitar sensacionalismos. Utilizar un lenguaje accesible pero técnicamente riguroso.`;

        // Update UI
        const aiActions = document.getElementById('ai-actions');
        const aiLinks = document.getElementById('ai-links');
        const copyContainer = document.getElementById('copy-container');

        copyContainer.classList.add('hidden');
        aiActions.classList.add('hidden');
        aiLinks.classList.add('hidden');

        typeWriter(prompt, promptOutput, 5, () => {
            copyContainer.classList.remove('hidden');
            aiActions.classList.remove('hidden');
            aiLinks.classList.remove('hidden');
            resultSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(promptOutput.textContent).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '¡Copiado!';
            setTimeout(() => copyBtn.textContent = originalText, 1500);
        });
    });


    // ===========================
    // NOTEBOOKLM INTEGRATION
    // ===========================
    const nlmGenerateBtn = document.getElementById('nlm-generate-btn');
    const nlmCopyBtn1 = document.getElementById('nlm-copy-btn-1');
    const nlmCopyBtn2 = document.getElementById('nlm-copy-btn-2');

    // ===========================
    // AUTO-FILL EJEMPLO NOTEBOOKLM
    // ===========================
    const fillNlmBtn = document.getElementById('fill-example-nlm-btn');
    if (fillNlmBtn) {
        fillNlmBtn.addEventListener('click', () => {
            document.getElementById('nlm-doc-type').value = 'pdf-investigacion';
            document.getElementById('nlm-tema').value = 'Prevención del Ciberacoso y Grooming';
            document.getElementById('nlm-nivel').value = 'avanzado';
            document.getElementById('nlm-audiencia').value = 'Equipos Directivos y Gabinetes Psicopedagógicos';
            document.getElementById('nlm-duracion').value = 'corto';
            document.getElementById('nlm-institucion').value = 'Ministerio de Educación';
            document.getElementById('nlm-notas').value = 'Necesito que el curso incluya protocolos de actuación específicos, un glosario de términos digitales (phishing, malware) y foco en la contención emocional.';
        });
    }

    const docTypeLabels = {
        'pdf-curso': 'un PDF de un curso o capacitación existente',
        'pdf-manual': 'un manual o guía técnica en PDF',
        'pdf-investigacion': 'un paper o investigación académica en PDF',
        'presentacion': 'una presentación (Google Slides / PPTX)',
        'audio-clase': 'un audio de una clase grabada',
        'video-youtube': 'un video de YouTube con una clase/charla',
        'web-articulo': 'un artículo web (URL)',
        'varios-archivos': 'múltiples archivos combinados'
    };

    const nivelLabels = {
        'introductorio': 'Introductorio / Básico',
        'intermedio': 'Intermedio',
        'avanzado': 'Avanzado / Especialización'
    };

    const duracionLabels = {
        'micro': 'Micro-curso (2-4 horas)',
        'corto': 'Curso corto (8-16 horas)',
        'medio': 'Curso medio (20-40 horas)',
        'extenso': 'Curso extenso (40+ horas / cuatrimestral)'
    };

    const duracionModulos = {
        'micro': '2 a 3 módulos compactos',
        'corto': '4 a 6 módulos',
        'medio': '6 a 10 módulos',
        'extenso': '10 a 16 módulos (organizados en unidades temáticas)'
    };

    // Update workflow step indicators
    function updateWorkflowSteps(activeStep) {
        document.querySelectorAll('.nlm-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            if (stepNum < activeStep) step.classList.add('completed');
            if (stepNum === activeStep) step.classList.add('active');
        });
    }

    nlmGenerateBtn.addEventListener('click', () => {
        if (isTyping) return;

        const docType = document.getElementById('nlm-doc-type').value;
        const tema = document.getElementById('nlm-tema').value || '[temática del material]';
        const nivel = document.getElementById('nlm-nivel').value;
        const audiencia = document.getElementById('nlm-audiencia').value || '[audiencia destino]';
        const duracion = document.getElementById('nlm-duracion').value;
        const institucion = document.getElementById('nlm-institucion').value || 'Formando Capital Humano';
        const notas = document.getElementById('nlm-notas').value;

        const docLabel = docTypeLabels[docType];
        const nivelLabel = nivelLabels[nivel];
        const duracionLabel = duracionLabels[duracion];
        const modulosLabel = duracionModulos[duracion];

        // Is it a multi-file scenario?
        const isMulti = docType === 'varios-archivos';
        const fileInstruction = isMulti 
            ? 'He subido múltiples archivos como fuentes en este notebook.' 
            : `He subido ${docLabel} como fuente en este notebook.`;

        // Build Prompt 1: Analysis prompt
        const prompt1 = `### INSTRUCCIÓN PARA NOTEBOOKLM — ANÁLISIS DE MATERIAL FUENTE

${fileInstruction}

**Tu tarea es analizar exhaustivamente todo el contenido de ${isMulti ? 'las fuentes subidas' : 'la fuente subida'} y generar un informe estructurado que incluya:**

1. **IDENTIFICACIÓN DEL MATERIAL**
   - Título o tema principal detectado
   - Tipo de documento (curso, manual, paper, presentación, etc.)
   - Extensión aproximada y profundidad del contenido
   - Autor/es o institución (si está disponible)

2. **RESUMEN EJECUTIVO**
   - Síntesis en 3-5 párrafos del contenido completo
   - Objetivo principal del material original
   - Enfoque metodológico o pedagógico detectado

3. **MAPA DE CONTENIDOS**
   - Lista completa de temas y subtemas abordados (en orden de aparición)
   - Jerarquía de conceptos (principales → secundarios → complementarios)
   - Palabras clave y términos técnicos más relevantes

4. **ANÁLISIS PEDAGÓGICO**
   - Nivel de profundidad actual del material (básico, intermedio, avanzado)
   - Fortalezas del contenido para la enseñanza
   - Vacíos o áreas que necesitarían complementarse
   - Actividades o evaluaciones incluidas (si las hay)

5. **RECURSOS Y REFERENCIAS**
   - Bibliografía o fuentes citadas en el material
   - Recursos multimedia mencionados
   - Enlaces o referencias externas

6. **RECOMENDACIONES PARA TRANSFORMACIÓN EN CURSO**
   - Qué partes del material son directamente aprovechables
   - Qué temas necesitarían mayor desarrollo
   - Sugerencias de estructura para un curso de nivel ${nivelLabel}
   - Posibles módulos o unidades temáticas derivables

**CONFIGURACIÓN:**
- Temática principal: "${tema}"
- Audiencia destino del futuro curso: ${audiencia}
- Nivel objetivo: ${nivelLabel}
- Institución: ${institucion}

Por favor, sé lo más exhaustivo y detallado posible en tu análisis. Este informe será la base para generar un curso profesional completo.`;

        // Build Prompt 2: Course generation prompt
        let notasSection = '';
        if (notas && notas.trim() !== '') {
            notasSection = `\n\n**REQUERIMIENTOS ESPECIALES DEL DOCENTE:**\n${notas}`;
        }

        const prompt2 = `### INSTRUCCIÓN PARA NOTEBOOKLM — GENERACIÓN DE CURSO PROFESIONAL

Basándote en el análisis que acabas de realizar del material fuente subido a este notebook, necesito que generes un **curso profesional completo** con la siguiente estructura y especificaciones:

---

## PARÁMETROS DEL CURSO

| Parámetro | Valor |
|-----------|-------|
| **Temática** | ${tema} |
| **Nivel** | ${nivelLabel} |
| **Audiencia** | ${audiencia} |
| **Duración estimada** | ${duracionLabel} |
| **Cantidad de módulos** | ${modulosLabel} |
| **Institución** | ${institucion} |
| **Material base** | El contenido analizado previamente en este notebook |

---

## ESTRUCTURA OBLIGATORIA DEL CURSO

Genera el curso completo siguiendo **exactamente** esta estructura:

### 1. PORTADA E IDENTIFICACIÓN
- Nombre del curso (proponer un título profesional y atractivo basado en el material)
- Institución: ${institucion}
- Modalidad sugerida (virtual, presencial, híbrida)
- Carga horaria: ${duracionLabel}

### 2. FUNDAMENTACIÓN Y PROPÓSITO
- Justificación de por qué este curso es relevante (basada en el material analizado)
- Propósito pedagógico general
- Competencias que se busca desarrollar (mínimo 5)

### 3. OBJETIVOS
- 1 Objetivo General
- Mínimo 5 Objetivos Específicos (deben ser medibles y usar verbos de la Taxonomía de Bloom según el nivel ${nivelLabel})

### 4. PERFIL DEL DESTINATARIO
- Descripción detallada de la audiencia: ${audiencia}
- Conocimientos previos necesarios
- Perfil de egreso (qué sabrá hacer al finalizar)

### 5. CONTENIDOS MODULARES (${modulosLabel})
Para CADA MÓDULO generar:
- **Título del módulo**
- **Objetivos específicos del módulo** (2-3)
- **Contenidos teóricos** (desarrollados en detalle, extraídos y ampliados del material fuente)
- **Actividades prácticas** (mínimo 2 por módulo):
  - Actividad individual
  - Actividad grupal o colaborativa
- **Recursos complementarios** (lecturas, videos, herramientas)
- **Autoevaluación del módulo** (3-5 preguntas)

### 6. MAPA CONCEPTUAL GENERAL
- Describir textualmente un mapa conceptual que conecte todos los módulos y sus relaciones

### 7. METODOLOGÍA
- Enfoque pedagógico (constructivismo, aprendizaje basado en problemas, etc.)
- Estrategias didácticas específicas
- Uso de tecnología educativa

### 8. CRONOGRAMA SUGERIDO
- Distribución temporal de los módulos
- Hitos y entregas clave
- Momentos de evaluación

### 9. SISTEMA DE EVALUACIÓN
- Criterios de evaluación
- Instrumentos:
  - Evaluación diagnóstica (al inicio)
  - Evaluaciones formativas (durante el proceso)
  - Evaluación sumativa / integradora final
- Rúbrica de evaluación del proyecto final
- Escala de calificación

### 10. GUIÓN DE VIDEO INTRODUCTORIO
- Guión completo de 2-3 minutos para un video de presentación del curso
- Incluir: bienvenida, recorrido del curso, motivación y cierre

### 11. BIBLIOGRAFÍA Y RECURSOS
- Referencias bibliográficas en formato APA 7 (incluir las del material fuente + complementarias)
- Recursos web recomendados
- Herramientas digitales sugeridas

---

## DIRECTIVAS DE CALIDAD

- **CRÍTICO**: Todo el contenido debe estar basado y ser coherente con el material fuente analizado en este notebook.
- Amplía y enriquece el contenido original, no lo copies textualmente.
- Adapta el nivel de complejidad a: ${nivelLabel}.
- Usa un tono profesional, claro y pedagógicamente sólido.
- Incluye ejemplos prácticos y casos de estudio relevantes.
- Asegúrate de que las actividades sean viables y aplicables.
- Utiliza terminología técnica adecuada al campo de "${tema}".${notasSection}

---

Por favor, genera el curso completo y detallado. No omitas ninguna sección. Cada módulo debe tener contenido sustancial desarrollado, no solo títulos o bullets.`;

        // Show containers
        const container1 = document.getElementById('nlm-prompt-1-container');
        const container2 = document.getElementById('nlm-prompt-2-container');
        const divider = document.getElementById('nlm-divider');
        const output1 = document.getElementById('nlm-prompt-1-output');
        const output2 = document.getElementById('nlm-prompt-2-output');

        container1.classList.remove('hidden');
        container2.classList.add('hidden');
        divider.classList.add('hidden');

        updateWorkflowSteps(2);

        // Type prompt 1, then show prompt 2
        typeWriter(prompt1, output1, 3, () => {
            divider.classList.remove('hidden');
            container2.classList.remove('hidden');
            updateWorkflowSteps(3);

            setTimeout(() => {
                typeWriter(prompt2, output2, 2, () => {
                    const resultSection = document.getElementById('nlm-result-section');
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
                });
            }, 600);
        });

        // Scroll to result
        document.getElementById('nlm-result-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Copy buttons for NLM
    function setupNlmCopy(btn, outputId) {
        btn.addEventListener('click', () => {
            const text = document.getElementById(outputId).textContent;
            navigator.clipboard.writeText(text).then(() => {
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    setupNlmCopy(nlmCopyBtn1, 'nlm-prompt-1-output');
    setupNlmCopy(nlmCopyBtn2, 'nlm-prompt-2-output');
});
