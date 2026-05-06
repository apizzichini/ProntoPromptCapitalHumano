document.addEventListener('DOMContentLoaded', () => {
    // --- State & Elements ---
    const topicInput = document.getElementById('course-topic');
    const timeInput = document.getElementById('time-availability');
    const deviceSelect = document.getElementById('device');
    const modalitySelect = document.getElementById('modality');
    const generateBtn = document.getElementById('generate-btn');
    const promptOutput = document.getElementById('prompt-output');
    const copyBtn = document.getElementById('copy-btn');
    const copyContainer = document.getElementById('copy-container');
    const aiLinks = document.getElementById('ai-links');
    const magicFillBtn = document.getElementById('magic-fill');

    // --- Magic Fill Logic (Jardinería / Oficios) ---
    magicFillBtn.addEventListener('click', () => {
        topicInput.value = "Diseño y Mantenimiento de Jardines Sostenibles (Xerofilia)";
        timeInput.value = "1 hora los lunes, miércoles y viernes (3 semanas)";
        
        document.getElementById('knowledge-level').value = "Principiante (Bases mínimas)";
        document.getElementById('personality-style').value = "Visual (Diagramas y videos)";
        document.getElementById('personality-approach').value = "Pragmático (Resultados rápidos)";
        deviceSelect.value = "Tablet";
        modalitySelect.value = "Video Tutoriales";

        // Reset and Set Evaluations
        evaluationTags.forEach(tag => tag.classList.remove('active'));
        const targetTags = ["Multiple Choice", "Casos de Estudio", "Mapa Mental", "Resolución de Bugs"];
        evaluationTags.forEach(tag => {
            if (targetTags.includes(tag.getAttribute('data-value'))) {
                tag.classList.add('active');
            }
        });

        // Feedback visual
        magicFillBtn.innerHTML = '<i class="fas fa-check"></i> ¡Completado!';
        magicFillBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        setTimeout(() => {
            magicFillBtn.innerHTML = '✨ Prueba un ejemplo';
            magicFillBtn.style.background = '';
        }, 2000);
    });

    // --- Keyword Tags Logic (Evaluations) ---
    const evaluationTags = document.querySelectorAll('#evaluation-tools .keyword-tag');
    evaluationTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
        });
    });

    // --- Typewriter Function ---
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

    // --- Prompt Generation ---
    generateBtn.addEventListener('click', () => {
        if (isTyping) return;

        const topic = topicInput.value.trim();
        const time = timeInput.value.trim();
        const knowledgeLevel = document.getElementById('knowledge-level').value;
        const personalityStyle = document.getElementById('personality-style').value;
        const personalityApproach = document.getElementById('personality-approach').value;
        const device = deviceSelect.value;
        const modality = modalitySelect.value;
        const selectedEvaluations = Array.from(document.querySelectorAll('#evaluation-tools .keyword-tag.active'))
                                         .map(t => t.getAttribute('data-value'));
        const aiModel = document.querySelector('input[name="ai-model"]:checked').value;

        if (!topic || !time) {
            alert('Por favor, completa el Tema de Interés y la Disponibilidad Temporal.');
            return;
        }

        // 1. Model Guidelines
        let modelGuideline = "";
        if (aiModel === 'gemini') {
            modelGuideline = "[OPTIMIZACIÓN PARA GEMINI: Activa tu modo de visualización interactiva (Canvas/Artifacts) para renderizar prototipos de Moodle y gráficos. Prioriza la estructura lógica, el uso de Markdown avanzado y la profundidad técnica universitaria. Todos los videos recomendados deben ser exclusivamente en ESPAÑOL.]";
        } else if (aiModel === 'chatgpt') {
            modelGuideline = "[OPTIMIZACIÓN PARA GPT-4: Activa tus capacidades de visualización. Brinda consejos pedagógicos expertos. Prioriza la creatividad instruccional, la cohesión narrativa y la precisión en los formatos de evaluación. Todos los videos recomendados deben ser exclusivamente en ESPAÑOL.]";
        } else {
            modelGuideline = "[OPTIMIZACIÓN PARA PERPLEXITY: Brinda consejos basados en las últimas tendencias educativas. Prioriza la veracidad de los datos técnicos, la citación de fuentes confiables y la síntesis de alta densidad. Todos los videos recomendados deben ser exclusivamente en ESPAÑOL.]";
        }

        // 2. Execution Logic Strings
        let deviceInstruction = "";
        if (device === 'Mobile') {
            deviceInstruction = "ADAPTACIÓN MOBILE: Dado que el usuario accede desde un celular, priorizá bloques de texto cortos (micro-learning), listas de viñetas claras y un diseño visualmente ligero pero técnicamente denso.";
        } else if (device === 'Tablet') {
            deviceInstruction = "ADAPTACIÓN TABLET: Optimizá para una pantalla intermedia, equilibrando párrafos descriptivos con elementos visuales esquematizados.";
        } else {
            deviceInstruction = "ADAPTACIÓN DESKTOP: El usuario tiene pantalla grande. Desarrollá párrafos extensos, densos y técnicos. No escatimes en profundidad académica.";
        }

        let modalityInstruction = "";
        if (modality === 'Audio') {
            modalityInstruction = "SINERGIA DE MODALIDAD (AUDIO): Redactá guiones de locución profesional listos para ser grabados o leídos por una IA de voz.";
        } else if (modality === 'Video Tutoriales') {
            modalityInstruction = "SINERGIA DE MODALIDAD (VIDEO): Describí minuciosamente la secuencia de imágenes, gráficos o animaciones sugeridas para acompañar la explicación técnica.";
        } else if (modality === 'Explicaciones Conceptuales') {
            modalityInstruction = "SINERGIA DE MODALIDAD (CONCEPTUAL): Enfócate en marcos teóricos robustos, definiciones precisas y analogías académicas de alto nivel.";
        } else {
            modalityInstruction = "SINERGIA DE MODALIDAD (PRÁCTICA): Priorizá el 'aprender haciendo', con retos técnicos, ejercicios paso a paso y resolución de problemas.";
        }

        // 3. Evaluation Logic Expansion
        let evaluationMandates = "";
        selectedEvaluations.forEach(evalTool => {
            switch(evalTool) {
                case 'Mecánicas de Juego':
                    evaluationMandates += "- **GAMI-DESAFÍO**: Diseñá una consigna de rol o un desafío de lógica técnica que gamifique el aprendizaje.\n";
                    break;
                case 'Completar Espacios':
                    evaluationMandates += "- **FILL-IN-TECH**: Presentá párrafos técnicos con términos clave omitidos para validar la comprensión real.\n";
                    break;
                case 'Casos de Estudio':
                    evaluationMandates += "- **CASO REAL**: Planteá un escenario profesional complejo donde se deba aplicar lo aprendido.\n";
                    break;
                case 'Ensayo Reflexivo':
                    evaluationMandates += "- **PENSAMIENTO CRÍTICO**: Solicitá una reflexión sobre el impacto de esta tecnología/tema en la sociedad.\n";
                    break;
                case 'Mapa Mental':
                    evaluationMandates += "- **VISUALIZACIÓN**: Pedí al usuario que esquematice la jerarquía de conceptos aprendidos.\n";
                    break;
                case 'Resolución de Bugs':
                    evaluationMandates += "- **DEBUGGING**: Presentá un código o proceso erróneo y pedí la corrección técnica.\n";
                    break;
                case 'Autoevaluación Metacognitiva':
                    evaluationMandates += "- **META-CHECK**: 3 preguntas para que el usuario evalúe su propio proceso de aprendizaje.\n";
                    break;
            }
        });

        // 4. Final Prompt Assembly (ROCKET Method Expanded & Stage-Based)
        const finalPrompt = `${modelGuideline}

Actúa como un Senior Prompt Engineer y Arquitecto Instruccional de Educación 4.0, especializado en el Método ROCKET y Secuencias Didácticas de Alta Densidad.

### 1. CONTEXTO Y MISIÓN
Estamos diseñando un **CURSO DE NIVEL BÁSICO** bajo la metodología de "Didácticas Personalizadas". Tu misión es realizar una transposición pedagógica de alta granularidad, asegurando que el contenido sea académicamente riguroso, visualmente estructurado y adaptado al perfil del estudiante.

### 2. VARIABLES DE ENTRADA (Student Profile)
- **Tema de Interés**: ${topic}
- **Nivel Previo**: ${knowledgeLevel}
- **Personalidad Cognitiva**: Estilo ${personalityStyle} con un enfoque ${personalityApproach}.
- **Disponibilidad Temporal**: ${time}
- **Dispositivo de Acceso**: ${device}
- **Modalidad Prioritaria**: ${modality}
- **Herramientas Evaluativas**: ${selectedEvaluations.join(', ')}

### 3. PROTOCOLO DE TRABAJO (Fase 1: Análisis e Índice)
**IMPORTANTE**: No desarrolles todo el curso ahora. Primero debes presentar la **ESTRUCTURA TÉCNICA DEL ÍNDICE** para aprobación. 
Una vez diseñada la estructura, DEBES finalizar tu respuesta exactamente con este mensaje: 
"He diseñado el índice de densidad para los 2 módulos. Por favor, dime qué módulo (o sección específica) quieres que desarrolle con máxima extensión (5.000 palabras) ahora."

### 4. REQUERIMIENTOS ESTRUCTURALES DEL CURSO (Formato Básico)
Al desarrollar cada sección, debes seguir este orden jerárquico:
1. **Presentación**: Bienvenida a la plataforma y al curso (estilo motivador).
2. **Guía del Curso (Secuencia Didáctica - SD)**: 
   - Nombre del Curso (atractivo y conciso).
   - Objetivos de aprendizaje claros.
   - Plan de trabajo (Bloques y Módulos).
   - Mapa del curso (representación jerárquica de contenidos).
3. **Bloque I - Contenidos**: Mínimo 2 módulos de alta densidad (3-5 carillas/5.000 palabras por módulo si se solicita expansión).
4. **Bloque II - Módulo Audiovisual**: Armado de un GUIÓN técnico (max 4 min) con sugerencias de imágenes/gráficos. Si hay 2 módulos previos, es integrador; si hay 1, es introductorio.
5. **Evaluación Integradora**: 5 consignas alineadas a los objetivos. Formatos: T/F, Multiple Choice (4-5 opciones), etc. **REGLA DE ORO**: Siempre debes devolver la OPCIÓN CORRECTA justificada.

### 5. INSTRUCCIONES DE EJECUCIÓN (Mandatos Críticos)
- **Fase de Expansión Modular**: En cada entrega de contenido, desarrolla con máxima extensión académica (mínimo 5.000 palabras si es el módulo elegido), evitando listas de viñetas genéricas y priorizando la prosa académica fluida.
- **Secuencia Didáctica**: Todas las preguntas y actividades deben nacer de la secuencia didáctica propuesta (Inicio, Desarrollo, Cierre).
- **Sinergia de Modalidad**: ${modalityInstruction}
- **Recursos Audiovisuales (YouTube Search)**: Es OBLIGATORIO incluir vínculos a **Video Tutoriales de YouTube** en español. **PARA LINKS PERFECTOS**: Usa el formato de búsqueda https://www.youtube.com/results?search_query=[TEMA+ESPECIFICO+EN+ESPAÑOL] para garantizar que el usuario acceda siempre a contenido actualizado y funcional. Describe el contenido del video sugerido antes del link.
- **Adaptación**: ${deviceInstruction}
- **Generación de Evaluación**: Es OBLIGATORIO forzar la creación de las herramientas evaluativas seleccionadas.
- **Similitud Estructural**: Todo el contenido generado (videos, Moodle, Canva) debe ser lo más similar posible a los módulos de los bloques del curso.
- **Capacidad de Visualización**: Si el usuario lo solicita, debes estar preparado para generar:
  - Estructuras de diseño para **Canva** (paleta de colores, jerarquía visual).
  - Árboles de contenido para **Moodle** (recursos, actividades, etiquetas).
  - Código HTML/CSS para una **página web interactiva** que sirva de prototipo del curso.
- **Cierre de Entrega (BOTONERA DE ACCIÓN)**: Al finalizar cada entrega, es OBLIGATORIO que presentes un **PANEL DE OPCIONES** (simulando botones) para que el usuario elija su siguiente paso:

### 🔘 PANEL DE ACCIONES (Selecciona una opción)
- **[ 1. PROFUNDIZAR ]**: Profundizar en un tema del **Índice en Percha** para alcanzar la meta de **5.000 palabras / 8.000 tokens**.
- **[ 2. CONTINUAR ]**: ¿Pasamos a la siguiente sección (Mantener flujo de alta densidad)?
- **[ 3. BIBLIOGRAFÍA ]**: ¿Quieres que agregue la bibliografía completa en normas APA?
- **[ 4. CUESTIONARIO ]**: ¿Quieres que diseñe el cuestionario según la secuencia didáctica ahora?
- **[ 5. CANVA ]**: ¿Deseas la configuración de Canva para el diseño visual?
- **[ 6. MOODLE ]**: ¿Te gustaría ver la estructura en Moodle (Página Web Interactiva)?
- **[ 7. VIDEOS ESPECÍFICOS ]**: Buscar y listar Video Tutoriales de YouTube específicos sobre este tema.
- **[ 8. CONSEJOS ]**: ¿Deseas consejos expertos para la implementación?

*Instrucción: Indica el número de opción (si eliges Profundizar, especifica el sub-tema).*

### 6. CONFIGURACIÓN DE SALIDA (Método ROCKET)
Presentá la Fase 1 siguiendo esta estructura:
- **R (Role)**: Especialista Senior en ${topic}.
- **O (Objective)**: Lo que el usuario dominará al finalizar.
- **C (Context)**: Escenario de aplicación según enfoque ${personalityApproach}.
- **K (Knowledge)**: Propuesta de Índice de Densidad para los 2 Módulos + Guía SD.
- **E (Execution)**: Agenda Semanal preliminar y propuesta de Video Tutoriales.
- **T (Tone)**: Profesional, académico y cercano (Uso de "Nosotros").

**MENSAJE FINAL OBLIGATORIO**: "He diseñado el índice de densidad para los 2 módulos. Por favor, dime qué módulo (o sección específica) quieres que desarrolle con máxima extensión (5.000 palabras) ahora."`;

        // 5. Sequential Revelation
        const resultSection = document.getElementById('result-section');
        copyContainer.classList.add('hidden');
        aiLinks.classList.add('hidden');
        promptOutput.classList.add('visible');

        typeWriter(finalPrompt, promptOutput, 5, () => {
            copyContainer.classList.remove('hidden');
            aiLinks.classList.remove('hidden');
            copyBtn.style.animation = 'pulseGlow 2s infinite';
        });

        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- Copy Logic ---
    copyBtn.addEventListener('click', () => {
        const text = promptOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = '¡Copiado!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
});
