from deep_translator import GoogleTranslator

langs_list = GoogleTranslator().get_supported_languages()
langs_dict = GoogleTranslator().get_supported_languages(as_dict=True)

def translate_text(src, dest_lang):
    obj = GoogleTranslator(source='auto', target=dest_lang)
    result = obj.translate(src)
    return result

