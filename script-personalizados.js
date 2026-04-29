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
            modelGuideline = "[OPTIMIZACIÓN PARA GEMINI: Prioriza la estructura lógica, el uso de Markdown avanzado y la profundidad técnica universitaria.]";
        } else if (aiModel === 'chatgpt') {
            modelGuideline = "[OPTIMIZACIÓN PARA GPT-4: Prioriza la creatividad instruccional, la cohesión narrativa y la precisión en los formatos de evaluación.]";
        } else {
            modelGuideline = "[OPTIMIZACIÓN PARA PERPLEXITY: Prioriza la veracidad de los datos técnicos, la citación de fuentes confiables (sin ser OER) y la síntesis de alta densidad.]";
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

        // 4. Final Prompt Assembly (ROCKET Method Expanded)
        const finalPrompt = `${modelGuideline}

Actúa como un Senior Prompt Engineer y Arquitecto Instruccional de Educación 4.0.

### 1. CONTEXTO (Context)
Estamos operando en la sección de "Cursos con Didácticas Personalizadas". El objetivo es democratizar el acceso al conocimiento técnico permitiendo que el usuario defina sus propias restricciones y preferencias.

### 2. OBJETIVO (Objective)
Transformar las variables de entrada en una Hoja de Ruta de Aprendizaje Soberana que se adapte perfectamente al tiempo, dispositivo, nivel de conocimiento y perfil cognitivo del usuario.

### 3. VARIABLES DE ENTRADA (Student Profile & Inputs)
- **Tema de Interés**: ${topic}
- **Nivel Previo**: ${knowledgeLevel}
- **Personalidad Cognitiva**: Estilo ${personalityStyle} con un enfoque ${personalityApproach}.
- **Disponibilidad Temporal**: ${time}
- **Dispositivo de Acceso**: ${device}
- **Modalidad Prioritaria**: ${modality}
- **Herramientas Evaluativas**: ${selectedEvaluations.join(', ')}

### 4. INSTRUCCIONES DE EJECUCIÓN (Execution Mandates)
- **Adaptación de Formato**: ${deviceInstruction}
- **Sinergia de Modalidad**: ${modalityInstruction}
- **MANDATO DE RECURSOS**: Es OBLIGATORIO recomendar y describir la búsqueda de al menos 3 **Video Tutoriales de YouTube** específicos y actualizados sobre el tema.
- **PLANIFICACIÓN**: Generá una **AGENDA SEMANAL DE TAREAS** detallada, distribuyendo la carga horaria según la disponibilidad de ${time}.
- **Bloque de Contenido**: Desarrollá el tema con el máximo detalle posible (densidad técnica alta), respetando la Secuencia Didáctica (Inicio, Desarrollo, Cierre). Ajustá la complejidad al nivel ${knowledgeLevel}.
- **Generación de Evaluación**: Es OBLIGATORIO forzar la creación de las herramientas evaluativas seleccionadas.
${evaluationMandates}
- **PROHIBICIÓN**: Queda TERMINANTEMENTE PROHIBIDO el uso de OER o recursos externos (excepto la recomendación de búsqueda en YouTube). Todo el conocimiento debe ser autogenerado y original.

### 5. CONFIGURACIÓN DE SALIDA (Método ROCKET)
Presentá la respuesta final siguiendo estrictamente esta estructura:

- **R (Role)**: Especialista Senior en ${topic} con enfoque pedagógico adaptado a perfil ${personalityStyle}.
- **O (Objective)**: Qué logrará el usuario específicamente en ${time} partiendo desde un nivel ${knowledgeLevel}.
- **C (Context)**: Situación real de aplicación profesional de este conocimiento según el enfoque ${personalityApproach}.
- **K (Knowledge)**: Desarrollo técnico-pedagógico exhaustivo y detallado (mínimo 5.000 palabras de densidad conceptual).
- **E (Execution)**: 
  1. Agenda Semanal de Tareas.
  2. Desarrollo del contenido adaptado a ${device}.
  3. Recomendación de Video Tutoriales (YouTube Search).
  4. Batería de Evaluaciones seleccionadas.
- **T (Tone)**: Profesional, motivador y académico (Uso de la primera persona del plural: "Nosotros").`;

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
