document.addEventListener('DOMContentLoaded', () => {
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

    const modelGuidelines = {
        'gemini': `[OPTIMIZACIÓN GEMINI]: Aprovecha la amplia ventana de contexto. Genera respuestas estructuradas y detalladas. Prioriza la claridad conceptual y la integración de todos los componentes del manual de abordaje.`,
        'chatgpt': `[OPTIMIZACIÓN GPT-4]: Utiliza un razonamiento paso a paso (Chain of Thought). Estructura la salida con Markdown riguroso. Asegura que cada sección cumpla con los lineamientos preventivos establecidos.`,
        'perplexity': `[OPTIMIZACIÓN PERPLEXITY]: Prioriza la investigación en tiempo real y la citación de fuentes actualizadas. Busca datos estadísticos y referencias bibliográficas recientes sobre la problemática.`
    };

    const expertLayers = {
        'standard': `[MODO: PROFESOR SENIOR]: Actúa como un experto docente con años de experiencia en la temática. Tu enfoque es la claridad pedagógica y la estructura lógica.`,
        'pedagogical': `[MODO: COMITÉ PEDAGÓGICO]: Simula un diálogo interno entre:
1. UN PEDAGOGO: Enfocado en la transposición didáctica.
2. UN ARQUITECTO DE CONTENIDOS: Enfocado en la jerarquía y el ritmo.`,
        'full': `[MODO: DEEP-AGENTIC ADVISORY]: Simula un comité de alto nivel compuesto por:
1. EXPERTO PEDAGÓGICO: Valida la didáctica.
2. DISEÑADOR UX EDUCATIVO: Asegura el engagement.
3. CORRECTOR DE ESTILO INSTITUCIONAL: Garantiza que el tono sea impecable.`,
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
});
